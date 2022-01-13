import { updateUser, updateUserData, clearUser } from './userSlice.js';

export default () => (next) => (action) => {
  if (updateUser.fulfilled.match(action) && action.payload) {
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  if (updateUserData.fulfilled.match(action) && action.payload) {
    localStorage.setItem('user', JSON.stringify(action.payload));
  }
  if (clearUser.match(action)) {
    localStorage.removeItem('user');
  }
  return next(action);
};
