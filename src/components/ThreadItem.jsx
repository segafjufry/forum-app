import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createSnippet, formatDate } from '../utils';
import VoteButtons from './VoteButtons';

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

function ThreadItem({ thread, authUserId, vote }) {
  const {
    id, title, body, category, createdAt, totalComments, owner, upVotesBy, downVotesBy,
  } = thread;

  return (
    <article className="thread-item">
      <p className="thread-item__category">{`#${category}`}</p>
      <h2 className="thread-item__title">
        <Link to={`/threads/${id}`}>{title}</Link>
      </h2>
      <p className="thread-item__snippet">{createSnippet(body)}</p>
      <VoteButtons
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUserId={authUserId}
        onVote={(voteType) => vote(id, voteType)}
      />
      <footer className="thread-item__meta">
        {owner && (
          <span className="thread-item__owner">
            <img src={owner.avatar} alt="" width="24" height="24" />
            {owner.name}
          </span>
        )}
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        <span>{`${totalComments} komentar`}</span>
      </footer>
    </article>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape(threadItemShape).isRequired,
  authUserId: PropTypes.string,
  vote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  authUserId: '',
};

export { threadItemShape };
export default ThreadItem;
