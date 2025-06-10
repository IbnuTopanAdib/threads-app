/**
 * skenario test
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, vi, expect, it } from 'vitest';
import api from '../../utils/api';
import { asyncPreloadProcess } from './action';
import { hideLoading, showLoading } from '../loading/action';
import { setAuthActionCreator } from '../authUser/action';
import { setIsPreloadActionCreator } from './action';

const fakeUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
};

const fakeError = new Error('Failed to fetch user profile');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch setAuthActionCreator with authUser when getOwnProfile is successful', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeUser);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthActionCreator(fakeUser));
    expect(dispatch).toBeCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toBeCalledWith(hideLoading());
  });

  it('should dispatch setAuthActionCreator with null when getOwnProfile failed', async () => {
    api.getOwnProfile = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toBeCalledWith(showLoading());
    expect(dispatch).toBeCalledWith(setAuthActionCreator(null));
    expect(dispatch).toBeCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toBeCalledWith(hideLoading());
  });
});
