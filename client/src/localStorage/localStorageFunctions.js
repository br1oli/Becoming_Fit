export const saveStorage = (key, prop) => {
  localStorage.setItem(key, JSON.stringify(prop));
};
export const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const deleteStorage = (key) => {
  localStorage.removeItem(key);
};
