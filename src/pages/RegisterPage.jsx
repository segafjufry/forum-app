import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/thunk';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async ({ name, email, password }) => {
    try {
      setError('');
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth">
      <h1>Buat akun</h1>
      <RegisterInput register={handleRegister} error={error} />
      <p>
        Sudah punya akun?
        {' '}
        <Link to="/login">Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
