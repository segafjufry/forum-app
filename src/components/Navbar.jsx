import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navbar({ authUser, signOut }) {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">Forum Diskusi</Link>
      <nav className="navbar__menu">
        <Link to="/leaderboard" className="button button--ghost">Peringkat</Link>
        {authUser ? (
          <>
            <Link to="/threads/new" className="button button--ghost">Buat diskusi</Link>
            <span className="navbar__user">{authUser.name}</span>
            <button type="button" className="button button--ghost" onClick={signOut}>
              Keluar
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="button button--ghost">Masuk</Link>
            <Link to="/register" className="button">Daftar</Link>
          </>
        )}
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  signOut: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  authUser: null,
};

export default Navbar;
