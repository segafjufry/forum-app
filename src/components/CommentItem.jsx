import PropTypes from 'prop-types';
import { formatDate, htmlToText } from '../utils';
import VoteButtons from './VoteButtons';

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

function CommentItem({ comment, authUserId, vote }) {
  const {
    id, content, createdAt, owner, upVotesBy, downVotesBy,
  } = comment;

  return (
    <li className="comment-item">
      <div className="thread-item__meta">
        <span className="thread-item__owner">
          {owner.avatar && <img src={owner.avatar} alt="" width="24" height="24" />}
          {owner.name}
        </span>
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </div>
      <p className="text-body">{htmlToText(content)}</p>
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUserId={authUserId}
        onVote={(voteType) => vote(id, voteType)}
      />
    </li>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape(commentItemShape).isRequired,
  authUserId: PropTypes.string,
  vote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUserId: '',
};

export { commentItemShape };
export default CommentItem;
