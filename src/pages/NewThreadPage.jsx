import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/thunk';

function NewThreadPage() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const handleAddThread = async ({ title, body, category }) => {
    try {
      setError('');
      await dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1>Buat diskusi</h1>
      <ThreadInput addThread={handleAddThread} error={error} />
    </section>
  );
}

export default NewThreadPage;
