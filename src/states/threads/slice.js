import { createSlice } from '@reduxjs/toolkit';
import { computeVotes } from '../../utils/vote';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    setThreads(state, action) {
      return action.payload;
    },
    setThreadVote(state, action) {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.find((item) => item.id === threadId);
      if (thread) {
        Object.assign(thread, computeVotes(thread, userId, voteType));
      }
    },
  },
});

export const { setThreads, setThreadVote } = threadsSlice.actions;

export default threadsSlice.reducer;
