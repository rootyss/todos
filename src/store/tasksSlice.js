import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    currentTabDetailsName: 'sub-tasks',
    fetchingState: 'none',
  },
  reducers: {
    addTaskToState(state, action) {
      const { tasks } = action.payload;
      const keysTasksData = _.keys(tasks);
      const newTasks = keysTasksData.map((key) => ({ ...tasks[key], id: key }));
      return { ...state, tasks: newTasks };
    },
    setCurrentTabDetailsName(state, action) {
      const { name } = action.payload;
      return { ...state, currentTabDetailsName: name };
    },
    pending: (state) => ({ ...state, fetchingState: 'pending' }),
    fulfilled: (state) => ({ ...state, fetchingState: 'finished' }),
    rejected: (state) => ({ ...state, fetchingState: 'error' }),
  },
});

export const getFetchingStateTasks = (state) => state.tasksInfo.fetchingState;
export const getTasks = (state) => state.tasksInfo.tasks;
export const getCurrentTask = (state) => {
  const { currentTaskId } = state.modal;
  return state.tasksInfo.tasks.find((task) => task.id === currentTaskId);
};
export const getCurrentTabDetailsName = (state) => state.tasksInfo.currentTabDetailsName;
export const {
  addTaskToState, setCurrentTabDetailsName, pending, fulfilled, rejected,
} = tasksSlice.actions;
export const tasksSliceReducer = tasksSlice.reducer;
