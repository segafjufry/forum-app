import { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      await addComment(content);
      setContent('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="comment">
        Tulis komentar
        <textarea
          id="comment"
          rows="4"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          required
        />
      </label>
      {error && <p className="form__error" role="alert">{error}</p>}
      <button type="submit" className="button">Kirim komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
