import { modalSliceReducer } from './modalSlice.js';
import { tasksSliceReducer } from './tasksSlice.js';
import { labelsSliceReducer } from './labelsSlice.js';
import { fetchingStateReducer } from './fetchingState.js';
import { userSliceReducer } from './userSlice.js';
import { usersSliceReducer } from './usersSlice.js';
import { leftMenuSliceReducer } from './leftMenuSlice.js';
import { commentsSliceReducer } from './commentsSlice.js';

export default {
  modal: modalSliceReducer,
  tasksInfo: tasksSliceReducer,
  labelsInfo: labelsSliceReducer,
  fetchingState: fetchingStateReducer,
  user: userSliceReducer,
  usersInfo: usersSliceReducer,
  leftMenu: leftMenuSliceReducer,
  commentsInfo: commentsSliceReducer,
};
