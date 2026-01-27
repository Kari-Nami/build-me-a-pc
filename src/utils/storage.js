const PREFIX = 'bb_';

function getKey(collection) {
  return `${PREFIX}${collection}`;
}

export function getCollection(collection) {
  const data = localStorage.getItem(getKey(collection));
  return data ? JSON.parse(data) : [];
}

export function setCollection(collection, data) {
  localStorage.setItem(getKey(collection), JSON.stringify(data));
}

export function getById(collection, id) {
  const items = getCollection(collection);
  return items.find(item => item.id === id) || null;
}

export function addItem(collection, item) {
  const items = getCollection(collection);
  items.push(item);
  setCollection(collection, items);
  return item;
}

export function updateItem(collection, id, updates) {
  const items = getCollection(collection);
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates, updated_at: new Date().toISOString() };
  setCollection(collection, items);
  return items[index];
}

export function deleteItem(collection, id) {
  const items = getCollection(collection);
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  setCollection(collection, filtered);
  return true;
}

export function query(collection, predicate) {
  const items = getCollection(collection);
  return items.filter(predicate);
}

export function getOne(collection, predicate) {
  const items = getCollection(collection);
  return items.find(predicate) || null;
}

export function getCurrentUser() {
  const data = localStorage.getItem(getKey('current_user'));
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(getKey('current_user'), JSON.stringify(user));
  } else {
    localStorage.removeItem(getKey('current_user'));
  }
}
