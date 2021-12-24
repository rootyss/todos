import { modalSliceReducer } from './modalSlice.js';
import { tasksSliceReducer } from './tasksSlice.js';
import { labelsSliceReducer } from './labelsSlice.js';
import { fetchingStateReducer } from './fetchingState.js';

export default {
  modal: modalSliceReducer,
  tasksInfo: tasksSliceReducer,
  labelsInfo: labelsSliceReducer,
  fetchingState: fetchingStateReducer,
};
