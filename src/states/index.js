import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/slice';
import categoryReducer from './category/slice';
import isPreloadReducer from './isPreload/slice';
import leaderboardsReducer from './leaderboards/slice';
import loadingReducer from './loading/slice';
import threadDetailReducer from './threadDetail/slice';
import threadsReducer from './threads/slice';
import usersReducer from './users/slice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    loading: loadingReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    selectedCategory: categoryReducer,
  },
});

export default store;
