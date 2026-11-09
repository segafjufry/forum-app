import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadList({ threads, authUserId, vote }) {
  if (threads.length === 0) {
    return <p>Belum ada diskusi.</p>;
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          authUserId={authUserId}
          vote={vote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUserId: PropTypes.string,
  vote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = {
  authUserId: '',
};

export default ThreadList;
