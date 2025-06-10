import React from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputThread from './InputThread';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { asyncAddThreadActionCreator } from '../states/threads/action';


vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../states/threads/action', () => ({
  asyncAddThreadActionCreator: vi.fn(),
}));

describe('InputThread component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render input and button', async () => {
    render(<InputThread />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    const body = await screen.getByPlaceholderText('Tuliskan isi diskusi...');
    const button = await screen.getByRole('button', { name: 'Buat Diskusi' });

    expect(titleInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should handle title, category, and body typing correctly', async () => {
    render(<InputThread />);
    const titleInput = await screen.getByPlaceholderText('Judul');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    const body = await screen.getByPlaceholderText('Tuliskan isi diskusi...');

    await userEvent.type(titleInput, 'Judul Diskusi');
    await userEvent.type(categoryInput, 'Kategori Diskusi');
    await userEvent.type(body, 'Ini adalah isi diskusi');

    expect(titleInput).toHaveValue('Judul Diskusi');
    expect(categoryInput).toHaveValue('Kategori Diskusi');
    expect(body).toHaveValue('Ini adalah isi diskusi');
  });

  it('should call handleSubmit when form is submitted', async () => {
    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);

    const mockThreadAction = { type: 'ADD_THREAD', payload: 'mock' };
    asyncAddThreadActionCreator.mockReturnValue(mockThreadAction);

    render(<InputThread />);

    const titleInput = await screen.getByPlaceholderText('Judul');
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    const bodyInput = await screen.getByPlaceholderText('Tuliskan isi diskusi...');
    const submitButton = await screen.getByRole('button', { name: 'Buat Diskusi' });

    await userEvent.type(titleInput, 'Diskusi Testing');
    await userEvent.type(categoryInput, 'Testing');
    await userEvent.type(bodyInput, 'Ini isi diskusinya');

    await userEvent.click(submitButton);

    expect(asyncAddThreadActionCreator).toHaveBeenCalledWith({
      title: 'Diskusi Testing',
      category: 'Testing',
      body: 'Ini isi diskusinya',
    });

    expect(mockDispatch).toHaveBeenCalledWith(mockThreadAction);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
