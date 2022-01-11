import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

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
      const labelsEntries = _.toPairs(labels);
      const userLabels = labelsEntries.map(([key, { label }]) => ({ key, label }));
      return { ...state, labels: userLabels };
    },
    addCurrentLabels(state, action) {
      const { currLabels } = action.payload;
      state.currentLabels.push(currLabels);
    },
    clearCurrentLabelsState(state) {
      return { ...state, currentLabels: [] };
    },
    deleteCurrentLabel(state, action) {
      const { id } = action.payload;
      _.remove(state.currentLabels, ({ key }) => key === id);
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
  deleteCurrentLabel,
} = labelsSlice.actions;
export const labelsSliceReducer = labelsSlice.reducer;
