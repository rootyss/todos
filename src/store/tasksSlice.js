import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTaskToState(state, action) {
      const { tasks } = action.payload;
      const keysTasksData = _.keys(tasks);
      const newTasks = keysTasksData.map((key) => ({ ...tasks[key], id: key }));
      return { ...state, tasks: newTasks };
    },
  },
});

export const getTasks = (state) => state.tasksInfo.tasks;
export const { addTaskToState } = tasksSlice.actions;
export const tasksSliceReducer = tasksSlice.reducer;
