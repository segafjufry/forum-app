import { createSlice } from '@reduxjs/toolkit';
import { computeVotes } from '../../utils/vote';

const initialState = { thread: null, notFound: false };

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    setThreadDetail(state, action) {
      state.thread = action.payload;
      state.notFound = false;
    },
    setThreadNotFound(state) {
      state.thread = null;
      state.notFound = true;
    },
    clearThreadDetail() {
      return initialState;
    },
    addComment(state, action) {
      state.thread.comments.unshift(action.payload);
    },
    setDetailThreadVote(state, action) {
      const { userId, voteType } = action.payload;
      if (state.thread) {
        Object.assign(state.thread, computeVotes(state.thread, userId, voteType));
      }
    },
    setCommentVote(state, action) {
      const { commentId, userId, voteType } = action.payload;
      const comment = state.thread?.comments.find((item) => item.id === commentId);
      if (comment) {
        Object.assign(comment, computeVotes(comment, userId, voteType));
      }
    },
  },
});

export const {
  setThreadDetail,
  setThreadNotFound,
  clearThreadDetail,
  addComment,
  setDetailThreadVote,
  setCommentVote,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
