import api from '../../api/api';
import { getVoteType } from '../../utils/vote';
import { hideLoading, showLoading } from '../loading/slice';
import { setThreadVote } from './slice';

// Daftar thread di beranda diambil ulang saat halaman dibuka,
// jadi thread baru otomatis muncul setelah pengguna kembali ke sana.
function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createThread({ title, body, category: category || undefined });
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Optimistic update: state diubah lebih dulu, lalu dikembalikan
// ke vote sebelumnya bila request gagal.
function asyncVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const thread = threads.find((item) => item.id === threadId);
    if (!authUser || !thread) {
      return;
    }

    const userId = authUser.id;
    const previousVote = getVoteType(thread, userId);

    dispatch(setThreadVote({ threadId, userId, voteType }));
    try {
      await api.voteThread(threadId, voteType);
    } catch (error) {
      dispatch(setThreadVote({ threadId, userId, voteType: previousVote }));
    }
  };
}

export { asyncAddThread, asyncVoteThread };
