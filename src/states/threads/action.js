import api from '../../utils/api';
import { showError, showSuccess } from '../../utils/toast';

const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD'
};

function setThreadsActionCreator(threads, authUserId) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
      authUserId,
    },
  };
}


function createThreadsActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  };
}

function upvoteThreadActionCreator(id, authUserId) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      id,
      authUserId,
    },
  };
}

function downvoteThreadActionCreator(id, authUserId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      id,
      authUserId,
    },
  };
}

function neutralizeVoteThreadActionCreator(id, authUserId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      id,
      authUserId,
    },
  };
}

function asyncAddThreadActionCreator({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThreads({ title, body, category });
      dispatch(createThreadsActionCreator(thread));
      showSuccess('Berhasil menambahkan thread');
    } catch (error) {
      showError('Gagal menambahkan thread:', error);
    }
  };
}

export {
  ActionType,
  setThreadsActionCreator,
  createThreadsActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncAddThreadActionCreator,
};