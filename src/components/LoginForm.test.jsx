import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders email and password inputs and submit button', () => {
    renderWithRouter(<LoginForm onLogin={mockOnLogin} />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/kata sandi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
  });

  it('calls onLogin with email and password when filled and submitted', async () => {
    renderWithRouter(<LoginForm onLogin={mockOnLogin} />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), 'user@example.com');
    await user.type(screen.getByPlaceholderText(/kata sandi/i), 'secret');
    await user.click(screen.getByRole('button', { name: /masuk/i }));

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
    });
  });

  it('shows alert when fields are empty and does not call onLogin', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<LoginForm onLogin={mockOnLogin} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /masuk/i }));

    expect(alertMock).toHaveBeenCalledWith('Email dan kata sandi tidak boleh kosong');
    expect(mockOnLogin).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});