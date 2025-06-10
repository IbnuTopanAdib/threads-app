/**
 * skenario test
 *
 * - asyncSetLeaderboardsActionCreator thunk
 *  - should dispatch action correctly when data fetching success
 *  - should call showError when data fetching failed
 */

import { describe, beforeEach, afterEach, vi, expect, it } from 'vitest';
import api from '../../utils/api';
import { asyncSetLeaderboardsActionCreator, setLeaderboardsActionCreator } from './action';
import { hideLoading, showLoading } from '../loading/action';
import { showError } from '../../utils/toast';

vi.mock('../../utils/toast', () => ({
  showError: vi.fn(),
}));

const fakeLeaderboards = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 10
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg'
    },
    score: 5
  }
];

const fakeError = new Error('Failed to fetch leaderboards');

describe('asyncSetLeaderboardsActionCreator thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
    vi.clearAllMocks(); // bersihkan mock
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboards);
    const dispatch = vi.fn();

    await asyncSetLeaderboardsActionCreator()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setLeaderboardsActionCreator(fakeLeaderboards));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should call showError when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    await asyncSetLeaderboardsActionCreator()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(showError).toBeCalledWith(fakeError);
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
