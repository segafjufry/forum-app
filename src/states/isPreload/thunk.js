import api from '../../api/api';
import { setAuthUser } from '../authUser/slice';
import { setIsPreload } from './slice';

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      // Token tidak ada atau sudah tidak berlaku: anggap belum login.
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export default asyncPreloadProcess;
