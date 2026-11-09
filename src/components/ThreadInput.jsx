import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread, error }) {
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addThread({ title, body, category });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="title">
        Judul
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <label htmlFor="category">
        Kategori (opsional)
        <input
          id="category"
          type="text"
          value={category}
          onChange={handleCategoryChange}
        />
      </label>
      <label htmlFor="body">
        Isi diskusi
        <textarea
          id="body"
          rows="8"
          value={body}
          onChange={handleBodyChange}
          required
        />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button type="submit" className="button">Terbitkan</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ThreadInput.defaultProps = {
  error: '',
};

export default ThreadInput;
