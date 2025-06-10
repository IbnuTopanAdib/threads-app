/**
 * Test scenario for threadsReducer function
 *
 * - should return the initial state when given by unknown action
 * - should return threads with currentUserVote when given SET_THREADS action
 * - should return new threads with new thread added when given ADD_THREAD action
 * - should update thread's votes when given UP_VOTE_THREAD action
 * - should update thread's votes when given DOWN_VOTE_THREAD action
 * - should update thread's votes when given NEUTRALIZE_VOTE_THREAD action
 */

import threadsReducer from './reducer';
import { ActionType } from './action';
import { describe, it, expect } from 'vitest';

describe('threadsReducer function', () => {
  const initialThreads = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    },
  ];

  it('should return the initial state when given unknown action', () => {
    const action = { type: 'AMBURADUL_ACTION' };
    const newState = threadsReducer(initialThreads, action);
    expect(newState).toEqual(initialThreads);
  });

  it('should return threads with currentUserVote when given SET_THREADS action', () => {
    const action = {
      type: ActionType.SET_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: ['user-1'],
            downVotesBy: [],
            totalComments: 0
          },
        ],
        authUserId: 'user-1',
      },
    };
    const newState = threadsReducer([], action);
    expect(newState).toEqual([
      {
        ...action.payload.threads[0],
        currentUserVote: 1,
      },
    ]);
  });

  it('should return new threads with added thread when given ADD_THREAD action', () => {
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 0
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };
    const newState = threadsReducer(initialThreads, action);
    expect(newState).toEqual([...initialThreads, newThread]);
  });

  it('should update thread vote when given UP_VOTE_THREAD action', () => {
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        id: 'thread-1',
        authUserId: 'user-1',
      },
    };
    const newState = threadsReducer(initialThreads, action);
    expect(newState[0].upVotesBy).toContain('user-1');
    expect(newState[0].downVotesBy).not.toContain('user-1');
    expect(newState[0].currentUserVote).toBe(1);
  });

  it('should update thread vote when given DOWN_VOTE_THREAD action', () => {
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        id: 'thread-1',
        authUserId: 'user-1',
      },
    };
    const newState = threadsReducer(initialThreads, action);
    expect(newState[0].downVotesBy).toContain('user-1');
    expect(newState[0].upVotesBy).not.toContain('user-1');
    expect(newState[0].currentUserVote).toBe(-1);
  });

  it('should neutralize vote when given NEUTRALIZE_VOTE_THREAD action', () => {
    const votedState = [
      {
        ...initialThreads[0],
        upVotesBy: ['user-1'],
        downVotesBy: [],
        currentUserVote: 1,
      },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        id: 'thread-1',
        authUserId: 'user-1',
      },
    };
    const newState = threadsReducer(votedState, action);
    expect(newState[0].upVotesBy).not.toContain('user-1');
    expect(newState[0].downVotesBy).not.toContain('user-1');
    expect(newState[0].currentUserVote).toBe(0);
  });
});
