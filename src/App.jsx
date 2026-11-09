import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import NewThreadPage from './pages/NewThreadPage';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/thunk';
import asyncPreloadProcess from './states/isPreload/thunk';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <Navbar authUser={authUser} signOut={handleSignOut} />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/threads/new" element={<NewThreadPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
