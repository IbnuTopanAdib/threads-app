import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncSetUsersAndThreads, asyncUpVoteThreadActionCreator } from './action';
import { setUsersActionCreator } from '../users/action';
import { setThreadsActionCreator } from '../threads/action';
import { upvoteThreadActionCreator } from '../threads/action';
import { upvoteThreadDetailActionCreator } from '../threadDetail/action';
import { showLoading, hideLoading } from '../loading/action';
import { showError } from '../../utils/toast';

vi.mock('../../utils/toast', () => ({
  showError: vi.fn(),
}));

const fakeUsers = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg'
  }
];

const fakeAuthUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeThreads = [
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
  }
];
/**
 * Test scenario for asyncSetUsersAndThreads thunk
 *
 * - should dispatch action correctly when data fetching success when API call is successful
 * - should call showError and still dispatch hideLoading when API call fails
 */

describe('asyncSetUsersAndThreads', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsers);
    api.getAllThreads = () => Promise.resolve(fakeThreads);

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncSetUsersAndThreads()(dispatch, getState);
    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setUsersActionCreator(fakeUsers));
    expect(dispatch).toBeCalledWith(setThreadsActionCreator(fakeThreads, fakeAuthUser.id));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should call showError and still dispatch hideLoading when data fetching failed', async () => {
    const fakeError = new Error('Failed to fetch users or threads');
    api.getAllUsers = () => Promise.reject(fakeError);
    api.getAllThreads = () => Promise.reject(fakeError);

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
    });

    await asyncSetUsersAndThreads()(dispatch, getState);
    expect(dispatch).toBeCalledWith(showLoading());
    expect(showError).toBeCalledWith('Error fetching users or talks:', fakeError);
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});

/**
 * Test scenario for asyncUpVoteThreadActionCreator thunk
 *
 * - should dispatch upvoteThreadActionCreator and upvoteThreadDetailActionCreator when threadDetail is open
 * - should dispatch only upvoteThreadActionCreator when threadDetail is null
 * - should call showError when API call fails
 */

describe('asyncUpVoteThreadActionCreator thunk', () => {

  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    delete api._upVoteThread;
  });

  it('should dispatch upvoteThreadActionCreator and upvoteThreadDetailActionCreator when successful and threadDetail is open', async () => {
    api.upVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: { id: fakeThreads[0].id }
    });

    await asyncUpVoteThreadActionCreator(fakeThreads[0].id)(dispatch, getState);

    expect(dispatch).toBeCalledWith(upvoteThreadActionCreator(fakeThreads[0].id, fakeAuthUser.id));
    expect(dispatch).toBeCalledWith(upvoteThreadDetailActionCreator(fakeThreads[0].id, fakeAuthUser.id));
  });

  it('should dispatch only upvoteThreadActionCreator when threadDetail is not open', async () => {
    api.upVoteThread = () => Promise.resolve();

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: null
    });

    await asyncUpVoteThreadActionCreator(fakeThreads[0].id)(dispatch, getState);

    expect(dispatch).toBeCalledWith(upvoteThreadActionCreator(fakeThreads[0].id, fakeAuthUser.id));
    expect(dispatch).not.toBeCalledWith(upvoteThreadDetailActionCreator(fakeThreads[0].id, fakeAuthUser.id));
  });

  it('should call showError when API call fails', async () => {
    const fakeError = new Error('Upvote failed');
    api.upVoteThread = () => Promise.reject(fakeError);

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: fakeAuthUser,
      threadDetail: { id: fakeThreads[0].id }
    });

    await asyncUpVoteThreadActionCreator(fakeThreads[0].id)(dispatch, getState);

    expect(showError).toBeCalledWith('Error upvoting thread:', fakeError);
    expect(dispatch).not.toBeCalledWith(upvoteThreadActionCreator(fakeThreads[0].id, fakeAuthUser.id));
    expect(dispatch).not.toBeCalledWith(upvoteThreadDetailActionCreator(fakeThreads[0].id, fakeAuthUser.id));

  });
});
