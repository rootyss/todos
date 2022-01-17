import { createSlice } from '@reduxjs/toolkit';

const leftMenuSlice = createSlice({
  name: 'leftMenu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleStatus(state, action) {
      return { ...state, isOpen: action.payload };
    },
  },
});

export const getMenuStatus = (state) => state.leftMenu.isOpen;
export const { toggleStatus } = leftMenuSlice.actions;
export const leftMenuSliceReducer = leftMenuSlice.reducer;
