import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const usersSlice = createSlice({
  name: 'usersInfo',
  initialState: [],
  reducers: {
    addUsersToState(state, action) {
      const { users } = action.payload;
      const keysUsersData = _.values(users);
      const usersList = keysUsersData.map(({
        uid, displayName, firstname, surname, email,
      }) => ({
        uid, displayName, firstname, surname, email,
      }));
      return usersList;
    },
  },
});

export const getUsers = (state) => state.usersInfo;
export const { addUsersToState } = usersSlice.actions;
export const usersSliceReducer = usersSlice.reducer;
