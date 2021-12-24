import { createSlice } from '@reduxjs/toolkit';

const fetchingState = createSlice({
  name: 'fetchingState',
  initialState: {
    fetchingState: 'none',
  },
  reducers: {
    pending: (state) => ({ ...state, fetchingState: 'pending' }),
    fulfilled: (state) => ({ ...state, fetchingState: 'finished' }),
    rejected: (state) => ({ ...state, fetchingState: 'error' }),
  },
});

export const getFetchingState = (state) => state.fetchingState.fetchingState;
export const { pending, fulfilled, rejected } = fetchingState.actions;
export const fetchingStateReducer = fetchingState.reducer;
