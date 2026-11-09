import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryFilter from '../components/CategoryFilter';
import ThreadList from '../components/ThreadList';
import { setSelectedCategory } from '../states/category/slice';
import asyncPopulateUsersAndThreads from '../states/shared/thunk';
import { asyncVoteThread } from '../states/threads/thunk';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);
  const selectedCategory = useSelector((states) => states.selectedCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleVote = (threadId, voteType) => {
    dispatch(asyncVoteThread({ threadId, voteType }));
  };

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const categories = [...new Set(threads.map((thread) => thread.category))].sort();

  const threadList = threads
    .filter((thread) => !selectedCategory || thread.category === selectedCategory)
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));

  return (
    <section>
      <h1>Diskusi terbaru</h1>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={handleSelectCategory}
      />
      <ThreadList
        threads={threadList}
        authUserId={authUser ? authUser.id : ''}
        vote={handleVote}
      />
    </section>
  );
}

export default HomePage;
