/**
 * Check compatibility between selected parts.
 * @param {Object} selectedParts - Map of category slug → part object
 * @returns {Array<{rule: number, severity: 'error'|'warning', message: string}>}
 */
export function checkCompatibility(selectedParts) {
  const issues = [];
  const cpu = selectedParts.cpu;
  const gpu = selectedParts.gpu;
  const motherboard = selectedParts.motherboard;
  const ram = selectedParts.ram;
  const storage = selectedParts.storage;
  const psu = selectedParts.psu;
  const pcCase = selectedParts.case;
  const cooling = selectedParts.cooling;

  // Rule 1: CPU ↔ Motherboard socket match
  if (cpu && motherboard) {
    if (cpu.specifications.socket !== motherboard.specifications.socket) {
      issues.push({
        rule: 1,
        severity: 'error',
        message: `CPU socket (${cpu.specifications.socket}) does not match motherboard socket (${motherboard.specifications.socket})`,
      });
    }
  }

  // Rule 2: RAM ↔ Motherboard type
  if (ram && motherboard) {
    if (ram.specifications.type !== motherboard.specifications.ram_type) {
      issues.push({
        rule: 2,
        severity: 'error',
        message: `RAM type (${ram.specifications.type}) does not match motherboard RAM type (${motherboard.specifications.ram_type})`,
      });
    }
  }

  // Rule 3: RAM ↔ Motherboard slots
  if (ram && motherboard) {
    if (ram.specifications.modules > motherboard.specifications.ram_slots) {
      issues.push({
        rule: 3,
        severity: 'error',
        message: `RAM modules (${ram.specifications.modules}) exceeds motherboard RAM slots (${motherboard.specifications.ram_slots})`,
      });
    }
  }

  // Rule 4: RAM ↔ Motherboard capacity
  if (ram && motherboard) {
    if (ram.specifications.total_capacity_gb > motherboard.specifications.max_ram_gb) {
      issues.push({
        rule: 4,
        severity: 'error',
        message: `RAM capacity (${ram.specifications.total_capacity_gb}GB) exceeds motherboard max (${motherboard.specifications.max_ram_gb}GB)`,
      });
    }
  }

  // Rule 5: Motherboard ↔ Case form factor
  if (motherboard && pcCase) {
    const supported = pcCase.specifications.supported_motherboards || [];
    if (!supported.includes(motherboard.specifications.form_factor)) {
      issues.push({
        rule: 5,
        severity: 'error',
        message: `Motherboard form factor (${motherboard.specifications.form_factor}) is not supported by case (supports: ${supported.join(', ')})`,
      });
    }
  }

  // Rule 6: GPU ↔ Case length
  if (gpu && pcCase) {
    if (gpu.specifications.length_mm > pcCase.specifications.max_gpu_length_mm) {
      issues.push({
        rule: 6,
        severity: 'error',
        message: `GPU length (${gpu.specifications.length_mm}mm) exceeds case max GPU length (${pcCase.specifications.max_gpu_length_mm}mm)`,
      });
    }
  }

  // Rule 7: Cooling ↔ CPU socket
  if (cooling && cpu) {
    const compatible = cooling.specifications.socket_compatibility || [];
    if (!compatible.includes(cpu.specifications.socket)) {
      issues.push({
        rule: 7,
        severity: 'error',
        message: `Cooler does not support CPU socket (${cpu.specifications.socket}). Supported: ${compatible.join(', ')}`,
      });
    }
  }

  // Rule 8: Cooling (air) ↔ Case height
  if (cooling && pcCase && cooling.specifications.type === 'Air') {
    if (cooling.specifications.height_mm && cooling.specifications.height_mm > pcCase.specifications.max_cooler_height_mm) {
      issues.push({
        rule: 8,
        severity: 'error',
        message: `Cooler height (${cooling.specifications.height_mm}mm) exceeds case max cooler height (${pcCase.specifications.max_cooler_height_mm}mm)`,
      });
    }
  }

  // Rule 9: Cooling (AIO) ↔ Case radiator support
  if (cooling && pcCase && cooling.specifications.type === 'AIO') {
    const radSize = cooling.specifications.radiator_size_mm + 'mm';
    const supported = pcCase.specifications.radiator_support || [];
    if (!supported.includes(radSize)) {
      issues.push({
        rule: 9,
        severity: 'error',
        message: `AIO radiator size (${radSize}) is not supported by case (supports: ${supported.join(', ')})`,
      });
    }
  }

  // Rule 10: PSU ↔ Total TDP (warning)
  if (psu) {
    let totalTdp = 0;
    if (cpu) totalTdp += cpu.specifications.tdp_watts || 0;
    if (gpu) totalTdp += gpu.specifications.tdp_watts || 0;
    const recommended = Math.ceil(totalTdp * 1.2);
    if (totalTdp > 0 && psu.specifications.wattage < recommended) {
      issues.push({
        rule: 10,
        severity: 'warning',
        message: `PSU wattage (${psu.specifications.wattage}W) may be insufficient. Recommended: ${recommended}W+ (total TDP ${totalTdp}W x 1.2)`,
      });
    }
  }

  // Rule 11: PSU ↔ Case form factor (warning)
  if (psu && pcCase) {
    const psuFF = psu.specifications.form_factor;
    const caseFF = pcCase.specifications.form_factor;
    if (psuFF === 'ATX' && caseFF === 'ITX') {
      issues.push({
        rule: 11,
        severity: 'warning',
        message: `ATX PSU may not fit in ITX case. Consider an SFX power supply.`,
      });
    }
    if (psuFF === 'SFX' && caseFF === 'ATX') {
      issues.push({
        rule: 11,
        severity: 'warning',
        message: `SFX PSU in ATX case — make sure you have an SFX-to-ATX bracket.`,
      });
    }
  }

  // Rule 12: Storage (M.2) ↔ Motherboard M.2 slots
  if (storage && motherboard) {
    if (storage.specifications.interface === 'M.2') {
      const m2Count = 1; // single storage selection
      if (m2Count > (motherboard.specifications.m2_slots || 0)) {
        issues.push({
          rule: 12,
          severity: 'error',
          message: `M.2 storage count (${m2Count}) exceeds motherboard M.2 slots (${motherboard.specifications.m2_slots})`,
        });
      }
    }
  }

  return issues;
}
