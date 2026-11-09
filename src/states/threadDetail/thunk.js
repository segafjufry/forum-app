import api from '../../api/api';
import { getVoteType } from '../../utils/vote';
import { hideLoading, showLoading } from '../loading/slice';
import {
  addComment,
  setCommentVote,
  setDetailThreadVote,
  setThreadDetail,
  setThreadNotFound,
} from './slice';

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(thread));
    } catch (error) {
      dispatch(setThreadNotFound());
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Error dilempar ke pemanggil agar form bisa menampilkan pesannya.
function asyncAddComment({ threadId, content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      const { authUser } = getState();
      // Respons komentar baru tidak memuat avatar, jadi diambil dari user login.
      dispatch(addComment({
        ...comment,
        owner: { ...comment.owner, avatar: authUser.avatar },
      }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncVoteThreadDetail({ voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const { thread } = threadDetail;
    if (!authUser || !thread) {
      return;
    }

    const userId = authUser.id;
    const previousVote = getVoteType(thread, userId);

    dispatch(setDetailThreadVote({ userId, voteType }));
    try {
      await api.voteThread(thread.id, voteType);
    } catch (error) {
      dispatch(setDetailThreadVote({ userId, voteType: previousVote }));
    }
  };
}

function asyncVoteComment({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const { thread } = threadDetail;
    const comment = thread?.comments.find((item) => item.id === commentId);
    if (!authUser || !comment) {
      return;
    }

    const userId = authUser.id;
    const previousVote = getVoteType(comment, userId);

    dispatch(setCommentVote({ commentId, userId, voteType }));
    try {
      await api.voteComment(thread.id, commentId, voteType);
    } catch (error) {
      dispatch(setCommentVote({ commentId, userId, voteType: previousVote }));
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncVoteThreadDetail,
  asyncVoteComment,
};
