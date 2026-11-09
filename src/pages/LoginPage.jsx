import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/thunk';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async ({ email, password }) => {
    try {
      setError('');
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth">
      <h1>Masuk</h1>
      <LoginInput login={handleLogin} error={error} />
      <p>
        Belum punya akun?
        {' '}
        <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  );
}

export default LoginPage;
