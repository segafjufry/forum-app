import api from '../../api/api';
import { hideLoading, showLoading } from '../loading/slice';
import { setLeaderboards } from './slice';

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboards(leaderboards));
    } catch (error) {
      dispatch(setLeaderboards([]));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default asyncReceiveLeaderboards;
