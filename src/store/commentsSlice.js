import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const commentsSlice = createSlice({
  name: 'commentsInfo',
  initialState: {},
  reducers: {
    addCommentsToState(state, action) {
      const { comments } = action.payload;
      const keysCommentsData = _.values(comments);
      const commentsList = keysCommentsData.map(({
        userUid, taskId, text, dateCommentAdded,
      }) => ({
        userUid, taskId, text, dateCommentAdded,
      }));
      return commentsList;
    },
  },
});

export const getComments = (state) => state.commentsInfo;
export const { addCommentsToState } = commentsSlice.actions;
export const commentsSliceReducer = commentsSlice.reducer;
