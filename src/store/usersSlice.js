import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const usersSlice = createSlice({
  name: 'usersInfo',
  initialState: {
    users: [],
    fetchingState: null,
  },
  reducers: {
    addUsersToState(state, action) {
      const { users } = action.payload;
      const keysUsersData = _.values(users);
      const usersList = keysUsersData.map(({
        uid, displayName, firstname, surname, email,
      }) => ({
        uid, displayName, firstname, surname, email,
      }));
      return { ...state, users: usersList };
    },
    pending: (state) => ({ ...state, fetchingState: 'pending' }),
    fulfilled: (state) => ({ ...state, fetchingState: 'finished' }),
    rejected: (state) => ({ ...state, fetchingState: 'error' }),
  },
});

export const getFetchingStateUsers = (state) => state.usersInfo.fetchingState;
export const getUsers = (state) => state.usersInfo.users;
export const {
  addUsersToState, pending, fulfilled, rejected,
} = usersSlice.actions;
export const usersSliceReducer = usersSlice.reducer;
