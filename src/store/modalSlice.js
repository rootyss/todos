import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
  },
  reducers: {
    openModal(state, action) {
      const { type } = action.payload;
      return { isOpen: true, type };
    },

    closeModal() {
      return { isOpen: false, type: null };
    },
  },
});

export const getModalInfo = (state) => state.modal;
export const { closeModal, openModal } = modalSlice.actions;
export const modalSliceReducer = modalSlice.reducer;
