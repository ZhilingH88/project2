export const addUserToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const removeUserFromLocalStorage = (name) => {
  localStorage.removeItem();
};

export const getUserFromLocalStorage = (name) => {
  const result = localStorage.getItem(name);
  const data = result ? JSON.parse(result) : null;
  return data;
};
