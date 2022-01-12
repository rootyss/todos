import { setUser, clearUser } from './userSlice.js';

export const localStorageMiddleware = () => (next) => (action) => {
  if (setUser.match(action) && action.payload) {
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  if (clearUser.match(action)) {
    localStorage.removeItem('user');
  }
  return next(action);
};