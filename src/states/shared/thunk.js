import api from '../../api/api';
import { hideLoading, showLoading } from '../loading/slice';
import { setThreads } from '../threads/slice';
import { setUsers } from '../users/slice';

// Data thread hanya berisi ownerId, jadi daftar user ikut diambil
// agar nama dan avatar pembuat thread bisa ditampilkan.
function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);
      dispatch(setUsers(users));
      dispatch(setThreads(threads));
    } catch (error) {
      // Gagal memuat: biarkan daftar kosong, pesan ditampilkan di halaman.
      dispatch(setUsers([]));
      dispatch(setThreads([]));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default asyncPopulateUsersAndThreads;
