import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login, error }) {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
        Kata sandi
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button type="submit" className="button">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
};

LoginInput.defaultProps = {
  error: '',
};

export default LoginInput;
