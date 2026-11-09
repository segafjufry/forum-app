import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import ThreadDetail from '../components/ThreadDetail';
import { clearThreadDetail } from '../states/threadDetail/slice';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncVoteComment,
  asyncVoteThreadDetail,
} from '../states/threadDetail/thunk';

function DetailPage() {
  const { id } = useParams();
  const { thread, notFound } = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => {
      dispatch(clearThreadDetail());
    };
  }, [id, dispatch]);

  const handleAddComment = (content) => (
    dispatch(asyncAddComment({ threadId: id, content }))
  );

  const handleVoteThread = (voteType) => {
    dispatch(asyncVoteThreadDetail({ voteType }));
  };

  const handleVoteComment = (commentId, voteType) => {
    dispatch(asyncVoteComment({ commentId, voteType }));
  };

  if (notFound) {
    return (
      <section>
        <h1>Diskusi tidak ditemukan</h1>
        <Link to="/">Kembali ke beranda</Link>
      </section>
    );
  }

  if (!thread) {
    return null;
  }

  const authUserId = authUser ? authUser.id : '';

  return (
    <section>
      <ThreadDetail thread={thread} authUserId={authUserId} vote={handleVoteThread} />
      <h2>{`Komentar (${thread.comments.length})`}</h2>
      {authUser ? (
        <CommentInput addComment={handleAddComment} />
      ) : (
        <p>
          <Link to="/login">Masuk</Link>
          {' '}
          untuk ikut berkomentar dan memberi vote.
        </p>
      )}
      <CommentList
        comments={thread.comments}
        authUserId={authUserId}
        vote={handleVoteComment}
      />
    </section>
  );
}

export default DetailPage;
