import { createSlice } from '@reduxjs/toolkit';

const labelsSlice = createSlice({
  name: 'labels',
  initialState: {
    labels: [],
  },
  reducers: {
    addLabelToState(state, action) {
      const { labels } = action.payload;
      return { labels };
    },
  },
});

export const { addLabelToState } = labelsSlice.actions;
export const labelsSliceReducer = labelsSlice.reducer;
