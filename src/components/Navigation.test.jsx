import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (component, { initialEntries = ['/'] } = {}) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

describe('Navigation', () => {
  afterEach(cleanup);

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  const getNavLink = (text) => {
    // Get the span that contains the text, then return its parent (the NavLink)
    return screen.getByText(text).parentElement;
  };

  it('Home NavLink should be active when clicked from another route', async () => {
    renderWithRouter(<Navigation />, { initialEntries: ['/create'] });
    const user = userEvent.setup();

    const homeLink = getNavLink('Home');
    const createLink = getNavLink('Create');

    expect(createLink).toHaveClass('text-blue-600');
    expect(homeLink).not.toHaveClass('text-blue-600');

    await user.click(homeLink);

    expect(homeLink).toHaveClass('text-blue-600');
    expect(createLink).not.toHaveClass('text-blue-600');
  });

  it('Create NavLink should be active when clicked from another route', async () => {
    renderWithRouter(<Navigation />, { initialEntries: ['/'] });
    const user = userEvent.setup();

    const homeLink = getNavLink('Home');
    const createLink = getNavLink('Create');

    expect(homeLink).toHaveClass('text-blue-600');
    expect(createLink).not.toHaveClass('text-blue-600');

    await user.click(createLink);

    expect(createLink).toHaveClass('text-blue-600');
    expect(homeLink).not.toHaveClass('text-blue-600');
  });

  it('Leaderboard NavLink should be active when clicked from another route', async () => {
    renderWithRouter(<Navigation />, { initialEntries: ['/'] });
    const user = userEvent.setup();

    const homeLink = getNavLink('Home');
    const leaderboardLink = getNavLink('Leaderboard');

    expect(homeLink).toHaveClass('text-blue-600');
    expect(leaderboardLink).not.toHaveClass('text-blue-600');

    await user.click(leaderboardLink);

    expect(leaderboardLink).toHaveClass('text-blue-600');
    expect(homeLink).not.toHaveClass('text-blue-600');
  });
});