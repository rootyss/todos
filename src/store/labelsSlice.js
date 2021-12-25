import { createSlice } from '@reduxjs/toolkit';

const labelsSlice = createSlice({
  name: 'labelsInfo',
  initialState: {
    labels: [],
    fetchingState: 'none',
  },
  reducers: {
    addLabelToState(state, action) {
      const { labels } = action.payload;
      return { labels };
    },
    pending: (state) => ({ ...state, fetchingState: 'pending' }),
    fulfilled: (state) => ({ ...state, fetchingState: 'finished' }),
    rejected: (state) => ({ ...state, fetchingState: 'error' }),
  },
});

export const getLabels = (state) => state.labelsInfo.labels;
export const getFetchingStateTasks = (state) => state.labelsInfo.fetchingState;
export const {
  addLabelToState, pending, fulfilled, rejected,
} = labelsSlice.actions;
export const labelsSliceReducer = labelsSlice.reducer;
