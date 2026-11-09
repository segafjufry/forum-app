import api from '../../api/api';
import { hideLoading, showLoading } from '../loading/slice';
import { setAuthUser } from './slice';

// Error sengaja tidak ditangkap di sini; halaman yang memanggil
// akan menampilkan pesan error ke pengguna.
function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(setAuthUser(null));
    api.removeAccessToken();
  };
}

export { asyncRegisterUser, asyncSetAuthUser, asyncUnsetAuthUser };
