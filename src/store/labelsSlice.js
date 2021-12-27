import { createSlice } from '@reduxjs/toolkit';

const labelsSlice = createSlice({
  name: 'labelsInfo',
  initialState: {
    labels: [],
    fetchingState: 'none',
    currentLabels: [],
  },
  reducers: {
    addLabelToState(state, action) {
      const { labels } = action.payload;
      return { ...state, labels };
    },
    addCurrentLabels(state, action) {
      const { currLabels } = action.payload;
      state.currentLabels.push(currLabels);
    },
    clearCurrentLabelsState(state) {
      return { ...state, currentLabels: [] };
    },
    pending: (state) => ({ ...state, fetchingState: 'pending' }),
    fulfilled: (state) => ({ ...state, fetchingState: 'finished' }),
    rejected: (state) => ({ ...state, fetchingState: 'error' }),
  },
});

export const getCurrentLabels = (state) => state.labelsInfo.currentLabels;
export const getLabels = (state) => state.labelsInfo.labels;
export const getFetchingStateTasks = (state) => state.labelsInfo.fetchingState;
export const {
  addLabelToState, pending, fulfilled, rejected, addCurrentLabels, clearCurrentLabelsState,
} = labelsSlice.actions;
export const labelsSliceReducer = labelsSlice.reducer;
