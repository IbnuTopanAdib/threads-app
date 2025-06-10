import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.SET_DETAIL_THREAD: {
    const { detailThread, authUserId } = action.payload;

    const commentsWithVote = detailThread.comments.map((comment) => {
      let currentUserVote = 0;

      if (comment.upVotesBy.includes(authUserId)) {
        currentUserVote = 1;
      } else if (comment.downVotesBy.includes(authUserId)) {
        currentUserVote = -1;
      }

      return {
        ...comment,
        currentUserVote,
      };
    });

    let currentUserVote = 0;
    if (detailThread.upVotesBy.includes(authUserId)) {
      currentUserVote = 1;
    } else if (detailThread.downVotesBy.includes(authUserId)) {
      currentUserVote = -1;
    }

    return {
      ...detailThread,
      currentUserVote,
      comments: commentsWithVote,
    };
  }

  case ActionType.UP_VOTE_THREAD_DETAIL: {
    const { authUserId } = action.payload;

    return {
      ...detailThread,
      currentUserVote: 1,
      upVotesBy: detailThread.upVotesBy.includes(authUserId)
        ? detailThread.upVotesBy
        : [...detailThread.upVotesBy, authUserId],
      downVotesBy: detailThread.downVotesBy.filter((id) => id !== authUserId),
    };
  }

  case ActionType.DOWN_VOTE_THREAD_DETAIL: {
    const { authUserId } = action.payload;

    return {
      ...detailThread,
      currentUserVote: -1,
      downVotesBy: detailThread.downVotesBy.includes(authUserId)
        ? detailThread.downVotesBy
        : [...detailThread.downVotesBy, authUserId],
      upVotesBy: detailThread.upVotesBy.filter((id) => id !== authUserId),
    };
  }

  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL: {
    const { authUserId } = action.payload;

    return {
      ...detailThread,
      currentUserVote: 0,
      upVotesBy: detailThread.upVotesBy.filter((id) => id !== authUserId),
      downVotesBy: detailThread.downVotesBy.filter((id) => id !== authUserId),
    };
  }

  case ActionType.ADD_COMMENT:
    return {
      ...detailThread,
      comments: [...detailThread.comments, action.payload.comment],
    };

  case ActionType.UP_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            currentUserVote: 1,
            upVotesBy: comment.upVotesBy.includes(action.payload.authUserId)
              ? comment.upVotesBy
              : [...comment.upVotesBy, action.payload.authUserId],
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };

  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            currentUserVote: -1,
            downVotesBy: comment.downVotesBy.includes(action.payload.authUserId)
              ? comment.downVotesBy
              : [...comment.downVotesBy, action.payload.authUserId],
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };

  case ActionType.NEUTRAL_VOTE_COMMENT:
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            currentUserVote: 0,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };

  default:
    return detailThread;
  }
}

export default detailThreadReducer;
