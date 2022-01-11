import { createSlice } from '@reduxjs/toolkit';

const defaultUserSettings = {
  firstname: '',
  surname: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const {
        uid, email, displayName, accessToken,
      } = action.payload;
      return {
        ...state, uid, email, displayName, accessToken, ...defaultUserSettings,
      };
    },
    clearUser() {
      return null;
    },
  },
});

export const getUser = (state) => state.user;
export const {
  setUser,
  clearUser,
} = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
