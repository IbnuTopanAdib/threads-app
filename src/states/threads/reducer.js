import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.SET_THREADS: {
    const { threads, authUserId } = action.payload;

    const threadsWithVote = threads.map((thread) => {
      let currentUserVote = 0;

      if (thread.upVotesBy.includes(authUserId)) {
        currentUserVote = 1;
      } else if (thread.downVotesBy.includes(authUserId)) {
        currentUserVote = -1;
      }

      return {
        ...thread,
        currentUserVote,
      };
    });

    return threadsWithVote;
  }


  case ActionType.ADD_THREAD:
    return [...threads, action.payload.thread];

  case ActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.id) return thread;

      const { authUserId } = action.payload;

      return {
        ...thread,
        currentUserVote: 1,
        upVotesBy: thread.upVotesBy.includes(authUserId)
          ? thread.upVotesBy
          : [...thread.upVotesBy, authUserId],
        downVotesBy: thread.downVotesBy.filter((id) => id !== authUserId),
      };
    });

  case ActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.id) return thread;

      const { authUserId } = action.payload;

      return {
        ...thread,
        currentUserVote: -1,
        downVotesBy: thread.downVotesBy.includes(authUserId)
          ? thread.downVotesBy
          : [...thread.downVotesBy, authUserId],
        upVotesBy: thread.upVotesBy.filter((id) => id !== authUserId),
      };
    });

  case ActionType.NEUTRALIZE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.id) return thread;

      const { authUserId } = action.payload;

      return {
        ...thread,
        currentUserVote: 0,
        upVotesBy: thread.upVotesBy.filter((id) => id !== authUserId),
        downVotesBy: thread.downVotesBy.filter((id) => id !== authUserId),
      };
    });

  default:
    return threads;
  }
}

export default threadsReducer;
