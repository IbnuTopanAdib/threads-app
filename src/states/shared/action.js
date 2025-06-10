import { setUsersActionCreator } from '../users/action';
import { setThreadsActionCreator } from '../threads/action';
import { upvoteThreadActionCreator } from '../threads/action';
import { downvoteThreadActionCreator } from '../threads/action';
import { neutralizeVoteThreadActionCreator } from '../threads/action';
import { upvoteThreadDetailActionCreator } from '../threadDetail/action';
import { downvoteThreadDetailActionCreator } from '../threadDetail/action';
import { neutralizeVoteThreadDetailActionCreator } from '../threadDetail/action';
import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/action';
import { showError } from '../../utils/toast';

function asyncSetUsersAndThreads() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(setUsersActionCreator(users));
      dispatch(setThreadsActionCreator(threads, authUser.id));
    } catch (error) {
      console.error(error);
      showError('Error fetching users or talks:', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThreadActionCreator(id) {
  return async (dispatch, getState) => {
    try {
      await api.upVoteThread(id);
      const { authUser, threadDetail } = getState();

      dispatch(upvoteThreadActionCreator(id, authUser.id));
      console.log('authUser in upvote:', authUser);
      console.log('threadDetail', threadDetail);

      if (threadDetail && threadDetail.id === id) {
        dispatch(upvoteThreadDetailActionCreator(id, authUser.id));
      }
    } catch (error) {
      showError('Error upvoting thread:', error);
    }
  };
}

function asyncDownVoteThreadActionCreator(id) {
  return async (dispatch, getState) => {
    try {
      await api.downVoteThread(id);
      const { authUser, threadDetail } = getState();
      dispatch(downvoteThreadActionCreator(id, authUser.id));
      if (threadDetail && threadDetail.id === id) {
        dispatch(downvoteThreadDetailActionCreator(id, authUser.id));
      }
    } catch (error) {
      showError('Error downvoting thread:', error);
    }
  };
}

function asyncNeutralizeVoteThreadActionCreator(id) {
  return async (dispatch, getState) => {
    try {
      await api.neutralizeVoteThread(id);
      const { authUser, threadDetail } = getState();
      dispatch(neutralizeVoteThreadActionCreator(id, authUser.id));
      if (threadDetail && threadDetail.id === id) {
        dispatch(neutralizeVoteThreadDetailActionCreator(id, authUser.id));
      }
    } catch (error) {
      showError('Error neutralizing vote:', error);
    }
  };
}

export {
  asyncSetUsersAndThreads,
  asyncUpVoteThreadActionCreator,
  asyncDownVoteThreadActionCreator,
  asyncNeutralizeVoteThreadActionCreator
};
