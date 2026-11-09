import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentList({ comments, authUserId, vote }) {
  if (comments.length === 0) {
    return <p>Belum ada komentar. Jadilah yang pertama.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          authUserId={authUserId}
          vote={vote}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUserId: PropTypes.string,
  vote: PropTypes.func.isRequired,
};

CommentList.defaultProps = {
  authUserId: '',
};

export default CommentList;
