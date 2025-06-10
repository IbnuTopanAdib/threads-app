import api from '../../utils/api';
import { showError } from '../../utils/toast';
import { showLoading, hideLoading } from '../loading/action';

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS'
};

function setLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards
    }
  };
}

function asyncSetLeaderboardsActionCreator() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      showError(error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  setLeaderboardsActionCreator,
  asyncSetLeaderboardsActionCreator
};