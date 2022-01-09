import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    currentTaskId: null,
  },
  reducers: {
    openModal(state, action) {
      const { type, taskId } = action.payload;
      return { isOpen: true, type, currentTaskId: taskId };
    },
    closeModal() {
      return { isOpen: false, type: null };
    },
  },
});

export const getModalInfo = (state) => state.modal;
export const { closeModal, openModal, setCurrentTaskId } = modalSlice.actions;
export const modalSliceReducer = modalSlice.reducer;
