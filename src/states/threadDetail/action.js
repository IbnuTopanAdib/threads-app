import api from '../../utils/api';
import { showError } from '../../utils/toast';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  SET_DETAIL_THREAD: 'SET_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL'
};

function setDetailThreadActionCreator(detailThread, authUserId) {
  return {
    type: ActionType.SET_DETAIL_THREAD,
    payload: {
      detailThread,
      authUserId
    }
  };
}


function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  };
}

function upvoteThreadDetailActionCreator(id, authUserId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      id,
      authUserId,
    },
  };
}

function downvoteThreadDetailActionCreator(id, authUserId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      id,
      authUserId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(id, authUserId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      id,
      authUserId,
    },
  };
}

function upvoteCommentActionCreator(threadId, commentId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId,
      commentId
    }
  };
}

function downvoteCommentActionCreator(threadId, commentId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId,
      commentId
    }
  };
}

function neutralizeVoteCommentActionCreator(threadId, commentId) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId,
      commentId
    }
  };
}

function asyncSetDetailThreadActionCreator(id) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const thread = await api.getThreadDetail(id);
      const { authUser } = getState();
      dispatch(setDetailThreadActionCreator(thread, authUser.id));
    } catch (error) {
      showError('failed to fetch thread detail', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}


function asyncAddCommentActionCreator(id, content) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      showError('failed to add comment', error);
    }
  };
}

function asyncUpvoteCommentActionCreator(threadId, commentId) {
  return async (dispatch) => {
    try {
      await api.upVoteComment({ threadId, commentId });
      dispatch(upvoteCommentActionCreator(threadId, commentId));
    } catch (error) {
      showError('failed to upvote comment', error);
    }
  };
}

function asyncDownvoteCommentActionCreator(threadId, commentId) {
  return async (dispatch) => {
    try {
      await api.downVoteComment({ threadId, commentId });
      dispatch(downvoteCommentActionCreator(threadId, commentId));
    } catch (error) {
      showError('failed to downvote comment', error);
    }
  };
}
function asyncNeutralizevoteCommentActionCreator(threadId, commentId) {
  return async (dispatch) => {
    try {
      await api.neutralizeVoteComment({ threadId, commentId });
      dispatch(neutralizeVoteCommentActionCreator(threadId, commentId));
    } catch (error) {
      showError('failed to neutralize comment', error);
    }
  };
}

export {
  ActionType,
  setDetailThreadActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  addCommentActionCreator,
  upvoteCommentActionCreator,
  downvoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncAddCommentActionCreator,
  asyncSetDetailThreadActionCreator,
  asyncUpvoteCommentActionCreator,
  asyncDownvoteCommentActionCreator,
  asyncNeutralizevoteCommentActionCreator
};

