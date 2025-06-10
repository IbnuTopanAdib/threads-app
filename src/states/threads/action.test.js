/**
 * skenario test
 *
 * - asyncAddThreadActionCreator thunk
 *  - should dispatch action and call showError correctly when data fetching success
 *  - should call showError when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { showError, showSuccess } from '../../utils/toast';
import { asyncAddThreadActionCreator, createThreadsActionCreator } from './action';

vi.mock('../../utils/toast', () => ({
  showError: vi.fn(),
  showSuccess: vi.fn(),
}));


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

describe('asyncAddThreadActionCreator thunk', () => {
  beforeEach(() => {
    api._createThreads = api.createThreads;
  });

  afterEach(() => {
    api.createThreads = api._createThreads;
    delete api._createThreads;
  });

  it('should dispatch action and call showSuccess correctly when data fetching success', async () => {
    api.createThreads = () => Promise.resolve(newThread);
    const dispatch = vi.fn();

    await asyncAddThreadActionCreator(newThread)(dispatch);

    expect(dispatch).toBeCalledWith(createThreadsActionCreator(newThread));
    expect(showSuccess).toBeCalledWith('Berhasil menambahkan thread');
  });

  it('should call showError when data fetching failed', async () => {
    const fakeError = new Error('Failed to add thread');
    api.createThreads = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    await asyncAddThreadActionCreator(newThread)(dispatch);

    expect(showError).toBeCalledWith('Gagal menambahkan thread:', fakeError);
  });
});