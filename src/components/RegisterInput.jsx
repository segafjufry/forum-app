import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register, error }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nama
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          autoComplete="name"
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="email"
          required
        />
      </label>
      <label htmlFor="password">
        Kata sandi (minimal 6 karakter)
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button type="submit" className="button">Buat akun</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
};

RegisterInput.defaultProps = {
  error: '',
};

export default RegisterInput;
