import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import detailThreadReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import loadingReducer from './loading/reducer';


const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: detailThreadReducer,
    leaderboards: leaderboardsReducer,
    loading : loadingReducer
  }
});

export default store;