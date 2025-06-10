import React from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputComment from './InputComment';
import { useDispatch } from 'react-redux';
import { asyncAddCommentActionCreator } from '../states/threadDetail/action';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../states/threadDetail/action', () => ({
  asyncAddCommentActionCreator: vi.fn(),
}));

describe('inputComment component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });
  it('should render input and button', async () => {
    render(<InputComment threadId="thread-1" />);
    const commentInput = await screen.getByPlaceholderText(
      'Tulis komentarmu di sini...'
    );
    const button = await screen.getByRole('button', { name: 'Kirim' });
    expect(commentInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should handle username typing correctly', async () => {
    render(<InputComment threadId="threead-id" />);
    const commentInput = await screen.getByPlaceholderText(
      'Tulis komentarmu di sini...'
    );
    await userEvent.type(commentInput, 'ini komentar');
    expect(commentInput).toHaveValue('ini komentar');
  });

  it('should call handleSubmitComment when form is submitted', async () => {
    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const mockAction = { type: 'ADD_COMMENT', payload: 'content' };
    asyncAddCommentActionCreator.mockReturnValue(mockAction);

    render(<InputComment threadId="thread-1" />);
    const commentInput = await screen.getByPlaceholderText(
      'Tulis komentarmu di sini...'
    );
    const button = await screen.getByRole('button', { name: 'Kirim' });

    await userEvent.type(commentInput, 'ini komentar');
    await userEvent.click(button);

    expect(asyncAddCommentActionCreator).toBeCalledWith(
      'thread-1',
      'ini komentar'
    );
    expect(mockDispatch).toBeCalledWith(mockAction);
    expect(commentInput).toHaveValue('');

  });
});
