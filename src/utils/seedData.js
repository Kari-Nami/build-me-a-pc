import { generateId } from './helpers.js';

const now = new Date().toISOString();

// ─── IDs (stable for cross-references) ────────────────────────────
const ids = {
  admin: generateId(),
  user1: generateId(),
  user2: generateId(),
  builder1: generateId(),
  builder2: generateId(),
  catCPU: generateId(),
  catGPU: generateId(),
  catMotherboard: generateId(),
  catRAM: generateId(),
  catStorage: generateId(),
  catPSU: generateId(),
  catCase: generateId(),
  catCooling: generateId(),
};

// ─── Part Categories ────────────────────────────────────────────────
export const partCategories = [
  { id: ids.catCPU, name: 'CPU', slug: 'cpu', description: 'Central Processing Unit', icon: 'cpu', sort_order: 1 },
  { id: ids.catGPU, name: 'GPU', slug: 'gpu', description: 'Graphics Processing Unit', icon: 'gpu', sort_order: 2 },
  { id: ids.catMotherboard, name: 'Motherboard', slug: 'motherboard', description: 'Motherboard / Mainboard', icon: 'motherboard', sort_order: 3 },
  { id: ids.catRAM, name: 'RAM', slug: 'ram', description: 'Memory', icon: 'ram', sort_order: 4 },
  { id: ids.catStorage, name: 'Storage', slug: 'storage', description: 'SSD / HDD Storage', icon: 'storage', sort_order: 5 },
  { id: ids.catPSU, name: 'PSU', slug: 'psu', description: 'Power Supply Unit', icon: 'psu', sort_order: 6 },
  { id: ids.catCase, name: 'Case', slug: 'case', description: 'PC Case / Chassis', icon: 'case', sort_order: 7 },
  { id: ids.catCooling, name: 'Cooling', slug: 'cooling', description: 'CPU Cooler', icon: 'cooling', sort_order: 8 },
];

// ─── Parts ──────────────────────────────────────────────────────────
const partIds = {};
function pid(label) {
  const id = generateId();
  partIds[label] = id;
  return id;
}

export const parts = [
  // CPU (5)
  { id: pid('r7_7700x'), category_id: ids.catCPU, name: 'AMD Ryzen 7 7700X', brand: 'AMD', model: 'Ryzen 7 7700X', price: 299.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', cores: 8, threads: 16, base_clock_ghz: 4.5, boost_clock_ghz: 5.4, tdp_watts: 105, integrated_graphics: true } },
  { id: pid('r5_7600x'), category_id: ids.catCPU, name: 'AMD Ryzen 5 7600X', brand: 'AMD', model: 'Ryzen 5 7600X', price: 199.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', cores: 6, threads: 12, base_clock_ghz: 4.7, boost_clock_ghz: 5.3, tdp_watts: 105, integrated_graphics: true } },
  { id: pid('i7_13700k'), category_id: ids.catCPU, name: 'Intel Core i7-13700K', brand: 'Intel', model: 'Core i7-13700K', price: 349.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'LGA1700', cores: 16, threads: 24, base_clock_ghz: 3.4, boost_clock_ghz: 5.4, tdp_watts: 125, integrated_graphics: true } },
  { id: pid('i5_13600k'), category_id: ids.catCPU, name: 'Intel Core i5-13600K', brand: 'Intel', model: 'Core i5-13600K', price: 264.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'LGA1700', cores: 14, threads: 20, base_clock_ghz: 3.5, boost_clock_ghz: 5.1, tdp_watts: 125, integrated_graphics: true } },
  { id: pid('r9_7950x'), category_id: ids.catCPU, name: 'AMD Ryzen 9 7950X', brand: 'AMD', model: 'Ryzen 9 7950X', price: 549.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', cores: 16, threads: 32, base_clock_ghz: 4.5, boost_clock_ghz: 5.7, tdp_watts: 170, integrated_graphics: true } },

  // GPU (5)
  { id: pid('rtx4070'), category_id: ids.catGPU, name: 'NVIDIA GeForce RTX 4070', brand: 'NVIDIA', model: 'RTX 4070', price: 549.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { interface: 'PCIe 4.0 x16', vram_gb: 12, vram_type: 'GDDR6X', length_mm: 244, tdp_watts: 200, recommended_psu_watts: 650, slots_occupied: 2.5 } },
  { id: pid('rtx4080'), category_id: ids.catGPU, name: 'NVIDIA GeForce RTX 4080', brand: 'NVIDIA', model: 'RTX 4080', price: 1099.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { interface: 'PCIe 4.0 x16', vram_gb: 16, vram_type: 'GDDR6X', length_mm: 304, tdp_watts: 320, recommended_psu_watts: 750, slots_occupied: 3 } },
  { id: pid('rx7900xtx'), category_id: ids.catGPU, name: 'AMD Radeon RX 7900 XTX', brand: 'AMD', model: 'RX 7900 XTX', price: 899.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { interface: 'PCIe 4.0 x16', vram_gb: 24, vram_type: 'GDDR6', length_mm: 287, tdp_watts: 355, recommended_psu_watts: 800, slots_occupied: 2.5 } },
  { id: pid('rtx4060'), category_id: ids.catGPU, name: 'NVIDIA GeForce RTX 4060', brand: 'NVIDIA', model: 'RTX 4060', price: 299.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { interface: 'PCIe 4.0 x16', vram_gb: 8, vram_type: 'GDDR6', length_mm: 240, tdp_watts: 115, recommended_psu_watts: 550, slots_occupied: 2 } },
  { id: pid('rx7800xt'), category_id: ids.catGPU, name: 'AMD Radeon RX 7800 XT', brand: 'AMD', model: 'RX 7800 XT', price: 449.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { interface: 'PCIe 4.0 x16', vram_gb: 16, vram_type: 'GDDR6', length_mm: 267, tdp_watts: 263, recommended_psu_watts: 700, slots_occupied: 2.5 } },

  // Motherboard (5)
  { id: pid('b650_tomahawk'), category_id: ids.catMotherboard, name: 'MSI MAG B650 TOMAHAWK WiFi', brand: 'MSI', model: 'MAG B650 TOMAHAWK WiFi', price: 219.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', form_factor: 'ATX', chipset: 'B650', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 128, m2_slots: 2, pcie_x16_slots: 1 } },
  { id: pid('x670e_aorus'), category_id: ids.catMotherboard, name: 'Gigabyte X670E AORUS Master', brand: 'Gigabyte', model: 'X670E AORUS Master', price: 399.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', form_factor: 'ATX', chipset: 'X670E', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 128, m2_slots: 4, pcie_x16_slots: 2 } },
  { id: pid('z690_strix'), category_id: ids.catMotherboard, name: 'ASUS ROG Strix Z790-E', brand: 'ASUS', model: 'ROG Strix Z790-E', price: 379.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'LGA1700', form_factor: 'ATX', chipset: 'Z790', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 128, m2_slots: 5, pcie_x16_slots: 2 } },
  { id: pid('b660m_mortar'), category_id: ids.catMotherboard, name: 'MSI MAG B660M Mortar WiFi', brand: 'MSI', model: 'MAG B660M Mortar WiFi', price: 159.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'LGA1700', form_factor: 'mATX', chipset: 'B660', ram_type: 'DDR5', ram_slots: 2, max_ram_gb: 64, m2_slots: 2, pcie_x16_slots: 1 } },
  { id: pid('b650i_itx'), category_id: ids.catMotherboard, name: 'ASUS ROG Strix B650E-I', brand: 'ASUS', model: 'ROG Strix B650E-I', price: 299.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { socket: 'AM5', form_factor: 'ITX', chipset: 'B650E', ram_type: 'DDR5', ram_slots: 2, max_ram_gb: 64, m2_slots: 2, pcie_x16_slots: 1 } },

  // RAM (4)
  { id: pid('corsair_ddr5_32'), category_id: ids.catRAM, name: 'Corsair Vengeance DDR5-6000 32GB', brand: 'Corsair', model: 'Vengeance DDR5-6000 32GB (2x16GB)', price: 109.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'DDR5', speed_mhz: 6000, capacity_gb: 16, modules: 2, total_capacity_gb: 32, cas_latency: 30 } },
  { id: pid('gskill_ddr5_32'), category_id: ids.catRAM, name: 'G.Skill Trident Z5 DDR5-6400 32GB', brand: 'G.Skill', model: 'Trident Z5 DDR5-6400 32GB (2x16GB)', price: 134.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'DDR5', speed_mhz: 6400, capacity_gb: 16, modules: 2, total_capacity_gb: 32, cas_latency: 32 } },
  { id: pid('corsair_ddr5_64'), category_id: ids.catRAM, name: 'Corsair Vengeance DDR5-5600 64GB', brand: 'Corsair', model: 'Vengeance DDR5-5600 64GB (2x32GB)', price: 189.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'DDR5', speed_mhz: 5600, capacity_gb: 32, modules: 2, total_capacity_gb: 64, cas_latency: 36 } },
  { id: pid('kingston_ddr5_16'), category_id: ids.catRAM, name: 'Kingston Fury Beast DDR5-5200 16GB', brand: 'Kingston', model: 'Fury Beast DDR5-5200 16GB (2x8GB)', price: 54.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'DDR5', speed_mhz: 5200, capacity_gb: 8, modules: 2, total_capacity_gb: 16, cas_latency: 40 } },

  // Storage (4)
  { id: pid('samsung_990pro'), category_id: ids.catStorage, name: 'Samsung 990 Pro 1TB', brand: 'Samsung', model: '990 Pro 1TB', price: 109.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'NVMe', interface: 'M.2', capacity_gb: 1000, read_speed_mbps: 7450, write_speed_mbps: 6900, form_factor: 'M.2 2280' } },
  { id: pid('wd_sn850x'), category_id: ids.catStorage, name: 'WD Black SN850X 2TB', brand: 'Western Digital', model: 'SN850X 2TB', price: 159.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'NVMe', interface: 'M.2', capacity_gb: 2000, read_speed_mbps: 7300, write_speed_mbps: 6600, form_factor: 'M.2 2280' } },
  { id: pid('crucial_p3'), category_id: ids.catStorage, name: 'Crucial P3 Plus 1TB', brand: 'Crucial', model: 'P3 Plus 1TB', price: 59.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'NVMe', interface: 'M.2', capacity_gb: 1000, read_speed_mbps: 5000, write_speed_mbps: 4200, form_factor: 'M.2 2280' } },
  { id: pid('samsung_870evo'), category_id: ids.catStorage, name: 'Samsung 870 EVO 1TB SATA', brand: 'Samsung', model: '870 EVO 1TB', price: 79.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'SATA', interface: '2.5"', capacity_gb: 1000, read_speed_mbps: 560, write_speed_mbps: 530, form_factor: '2.5"' } },

  // PSU (4)
  { id: pid('corsair_rm850x'), category_id: ids.catPSU, name: 'Corsair RM850x', brand: 'Corsair', model: 'RM850x', price: 139.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { wattage: 850, efficiency_rating: '80+ Gold', modular: 'Full', form_factor: 'ATX' } },
  { id: pid('evga_1000g'), category_id: ids.catPSU, name: 'EVGA SuperNOVA 1000 G7', brand: 'EVGA', model: 'SuperNOVA 1000 G7', price: 179.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { wattage: 1000, efficiency_rating: '80+ Gold', modular: 'Full', form_factor: 'ATX' } },
  { id: pid('seasonic_750'), category_id: ids.catPSU, name: 'Seasonic Focus GX-750', brand: 'Seasonic', model: 'Focus GX-750', price: 109.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { wattage: 750, efficiency_rating: '80+ Gold', modular: 'Full', form_factor: 'ATX' } },
  { id: pid('corsair_sf750'), category_id: ids.catPSU, name: 'Corsair SF750 Platinum', brand: 'Corsair', model: 'SF750 Platinum', price: 159.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { wattage: 750, efficiency_rating: '80+ Platinum', modular: 'Full', form_factor: 'SFX' } },

  // Case (4)
  { id: pid('4000d_airflow'), category_id: ids.catCase, name: 'Corsair 4000D Airflow', brand: 'Corsair', model: '4000D Airflow', price: 104.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { form_factor: 'ATX', supported_motherboards: ['ATX', 'mATX', 'ITX'], max_gpu_length_mm: 360, max_cooler_height_mm: 170, max_psu_length_mm: 180, drive_bays_3_5: 2, drive_bays_2_5: 2, included_fans: 2, radiator_support: ['120mm', '240mm', '280mm', '360mm'] } },
  { id: pid('nr200p'), category_id: ids.catCase, name: 'Cooler Master NR200P', brand: 'Cooler Master', model: 'NR200P', price: 99.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { form_factor: 'ITX', supported_motherboards: ['ITX'], max_gpu_length_mm: 330, max_cooler_height_mm: 155, max_psu_length_mm: 130, drive_bays_3_5: 1, drive_bays_2_5: 3, included_fans: 2, radiator_support: ['120mm', '240mm', '280mm'] } },
  { id: pid('h7_flow'), category_id: ids.catCase, name: 'NZXT H7 Flow', brand: 'NZXT', model: 'H7 Flow', price: 129.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { form_factor: 'ATX', supported_motherboards: ['ATX', 'mATX', 'ITX'], max_gpu_length_mm: 400, max_cooler_height_mm: 185, max_psu_length_mm: 200, drive_bays_3_5: 2, drive_bays_2_5: 2, included_fans: 2, radiator_support: ['120mm', '240mm', '280mm', '360mm'] } },
  { id: pid('lancool_iii'), category_id: ids.catCase, name: 'Lian Li Lancool III', brand: 'Lian Li', model: 'Lancool III', price: 149.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { form_factor: 'ATX', supported_motherboards: ['ATX', 'mATX', 'ITX'], max_gpu_length_mm: 420, max_cooler_height_mm: 187, max_psu_length_mm: 210, drive_bays_3_5: 4, drive_bays_2_5: 6, included_fans: 3, radiator_support: ['120mm', '240mm', '280mm', '360mm'] } },

  // Cooling (4)
  { id: pid('ak620'), category_id: ids.catCooling, name: 'DeepCool AK620', brand: 'DeepCool', model: 'AK620', price: 64.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'Air', socket_compatibility: ['AM5', 'AM4', 'LGA1700', 'LGA1200'], radiator_size_mm: null, height_mm: 160, fan_count: 2, tdp_rating_watts: 260 } },
  { id: pid('nh_d15'), category_id: ids.catCooling, name: 'Noctua NH-D15', brand: 'Noctua', model: 'NH-D15', price: 109.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'Air', socket_compatibility: ['AM5', 'AM4', 'LGA1700', 'LGA1200'], radiator_size_mm: null, height_mm: 165, fan_count: 2, tdp_rating_watts: 250 } },
  { id: pid('kraken_x63'), category_id: ids.catCooling, name: 'NZXT Kraken X63', brand: 'NZXT', model: 'Kraken X63', price: 149.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'AIO', socket_compatibility: ['AM5', 'AM4', 'LGA1700', 'LGA1200'], radiator_size_mm: 280, height_mm: null, fan_count: 2, tdp_rating_watts: 300 } },
  { id: pid('arctic_lf2_360'), category_id: ids.catCooling, name: 'Arctic Liquid Freezer II 360', brand: 'Arctic', model: 'Liquid Freezer II 360', price: 119.99, is_active: true, created_by: ids.admin, created_at: now, updated_at: now,
    specifications: { type: 'AIO', socket_compatibility: ['AM5', 'AM4', 'LGA1700', 'LGA1200'], radiator_size_mm: 360, height_mm: null, fan_count: 3, tdp_rating_watts: 350 } },
];

// ─── Users ──────────────────────────────────────────────────────────
export const users = [
  { id: ids.admin, email: 'admin@buildboard.com', password_hash: 'admin123', display_name: 'Admin', avatar_url: null, bio: 'Platform administrator', role: 'admin', is_banned: false, created_at: now, updated_at: now },
  { id: ids.user1, email: 'alice@example.com', password_hash: 'password123', display_name: 'Alice Chen', avatar_url: null, bio: 'PC enthusiast and gamer', role: 'user', is_banned: false, created_at: now, updated_at: now },
  { id: ids.user2, email: 'bob@example.com', password_hash: 'password123', display_name: 'Bob Martinez', avatar_url: null, bio: 'Content creator looking for the perfect workstation', role: 'user', is_banned: false, created_at: now, updated_at: now },
  { id: ids.builder1, email: 'techpro@example.com', password_hash: 'password123', display_name: 'TechPro Builds', avatar_url: null, bio: 'Professional PC builder with 10+ years experience', role: 'builder', is_banned: false, created_at: now, updated_at: now },
  { id: ids.builder2, email: 'elite@example.com', password_hash: 'password123', display_name: 'ElitePC Workshop', avatar_url: null, bio: 'Custom gaming and workstation builds', role: 'builder', is_banned: false, created_at: now, updated_at: now },
];

// ─── Builder Profiles ───────────────────────────────────────────────
export const builderProfiles = [
  { id: generateId(), user_id: ids.builder1, business_name: 'TechPro Builds', registration_number: 'BIZ-2024-001', address: '123 Tech Street, San Jose, CA', website: 'https://techprobuilds.example.com', portfolio_url: 'https://techprobuilds.example.com/portfolio', years_of_experience: 10, specialization: 'Gaming PCs, Workstations', avg_rating: 4.5, avg_response_time_hrs: 2.5, completed_builds: 150, is_verified: true, created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.builder2, business_name: 'ElitePC Workshop', registration_number: 'BIZ-2024-002', address: '456 Builder Ave, Austin, TX', website: 'https://elitepc.example.com', portfolio_url: null, years_of_experience: 7, specialization: 'Custom Gaming, RGB Builds', avg_rating: 4.2, avg_response_time_hrs: 4.0, completed_builds: 85, is_verified: true, created_at: now, updated_at: now },
];

// ─── Sample Builds ──────────────────────────────────────────────────
const buildIds = {
  gamingBuild: generateId(),
  workstationBuild: generateId(),
  showcaseBuild: generateId(),
};

export const builds = [
  { id: buildIds.gamingBuild, user_id: ids.user1, title: 'Ultimate Gaming Rig', description: 'High-end gaming build for 1440p gaming at max settings', purpose: 'Gaming', total_price: 1649.93, status: 'published', build_type: 'personal', availability_status: null, image_urls: [], specs_summary: null, like_count: 3, rating_avg: 4.5, rating_count: 2, created_at: now, updated_at: now },
  { id: buildIds.workstationBuild, user_id: ids.user2, title: 'Content Creator Workstation', description: 'Powerful workstation for video editing and 3D rendering', purpose: 'Content Creation', total_price: 2519.93, status: 'published', build_type: 'personal', availability_status: null, image_urls: [], specs_summary: null, like_count: 1, rating_avg: 5.0, rating_count: 1, created_at: now, updated_at: now },
  { id: buildIds.showcaseBuild, user_id: ids.builder1, title: 'ProGamer Elite Build', description: 'Pre-built high-performance gaming PC ready to ship. Professionally assembled with cable management and stress testing included.', purpose: 'Gaming', total_price: 1899.93, status: 'published', build_type: 'showcase', availability_status: 'available', image_urls: [], specs_summary: 'Ryzen 9 7950X / RTX 4080 / 64GB DDR5 / 2TB NVMe', like_count: 5, rating_avg: 4.8, rating_count: 3, created_at: now, updated_at: now },
];

// ─── Build Parts ────────────────────────────────────────────────────
export const buildParts = [
  // Gaming build: R7 7700X + RTX 4070 + B650 Tomahawk + Corsair DDR5 32GB + Samsung 990 Pro + Corsair RM850x + 4000D + AK620
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.r7_7700x, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.rtx4070, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.b650_tomahawk, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.corsair_ddr5_32, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.samsung_990pro, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.corsair_rm850x, quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds['4000d_airflow'], quantity: 1 },
  { id: generateId(), build_id: buildIds.gamingBuild, part_id: partIds.ak620, quantity: 1 },

  // Workstation: R9 7950X + RTX 4080 + X670E AORUS + Corsair DDR5 64GB + WD SN850X + EVGA 1000G + H7 Flow + Arctic 360
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.r9_7950x, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.rtx4080, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.x670e_aorus, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.corsair_ddr5_64, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.wd_sn850x, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.evga_1000g, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.h7_flow, quantity: 1 },
  { id: generateId(), build_id: buildIds.workstationBuild, part_id: partIds.arctic_lf2_360, quantity: 1 },

  // Showcase: R9 7950X + RTX 4080 + X670E AORUS + Corsair DDR5 64GB + WD SN850X + EVGA 1000G + Lancool III + Arctic 360
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.r9_7950x, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.rtx4080, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.x670e_aorus, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.corsair_ddr5_64, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.wd_sn850x, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.evga_1000g, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.lancool_iii, quantity: 1 },
  { id: generateId(), build_id: buildIds.showcaseBuild, part_id: partIds.arctic_lf2_360, quantity: 1 },
];

// ─── Sample Ratings ─────────────────────────────────────────────────
export const ratings = [
  { id: generateId(), user_id: ids.user2, build_id: buildIds.gamingBuild, score: 5, review_text: 'Excellent build! Great part selection for gaming.', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.builder1, build_id: buildIds.gamingBuild, score: 4, review_text: 'Solid choices. Would suggest a beefier cooler for the 7700X though.', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.user1, build_id: buildIds.workstationBuild, score: 5, review_text: 'Perfect for content creation workflows!', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.user1, build_id: buildIds.showcaseBuild, score: 5, review_text: 'TechPro delivers quality as always.', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.user2, build_id: buildIds.showcaseBuild, score: 5, review_text: 'Amazing pre-built, incredible value.', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.builder2, build_id: buildIds.showcaseBuild, score: 4, review_text: 'Nice build, would have gone with a bigger case though.', created_at: now, updated_at: now },
];

// ─── Sample Comments ────────────────────────────────────────────────
const commentIds = { c1: generateId(), c2: generateId() };

export const comments = [
  { id: commentIds.c1, user_id: ids.user2, build_id: buildIds.gamingBuild, parent_comment_id: null, content: 'What FPS are you getting in AAA titles at 1440p?', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.user1, build_id: buildIds.gamingBuild, parent_comment_id: commentIds.c1, content: 'Getting 100-140 FPS in most titles at max settings!', created_at: now, updated_at: now },
  { id: commentIds.c2, user_id: ids.user1, build_id: buildIds.showcaseBuild, parent_comment_id: null, content: 'How long does shipping typically take?', created_at: now, updated_at: now },
  { id: generateId(), user_id: ids.builder1, build_id: buildIds.showcaseBuild, parent_comment_id: commentIds.c2, content: 'Usually 5-7 business days after order confirmation.', created_at: now, updated_at: now },
];

// ─── Sample Likes ───────────────────────────────────────────────────
export const likes = [
  { id: generateId(), user_id: ids.user2, build_id: buildIds.gamingBuild, created_at: now },
  { id: generateId(), user_id: ids.builder1, build_id: buildIds.gamingBuild, created_at: now },
  { id: generateId(), user_id: ids.builder2, build_id: buildIds.gamingBuild, created_at: now },
  { id: generateId(), user_id: ids.user1, build_id: buildIds.workstationBuild, created_at: now },
  { id: generateId(), user_id: ids.user1, build_id: buildIds.showcaseBuild, created_at: now },
  { id: generateId(), user_id: ids.user2, build_id: buildIds.showcaseBuild, created_at: now },
  { id: generateId(), user_id: ids.builder2, build_id: buildIds.showcaseBuild, created_at: now },
  { id: generateId(), user_id: ids.admin, build_id: buildIds.showcaseBuild, created_at: now },
  { id: generateId(), user_id: ids.builder1, build_id: buildIds.showcaseBuild, created_at: now },
];

// Export IDs for reference
export { ids, buildIds, partIds };
