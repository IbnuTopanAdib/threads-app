import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicOnlyRoute from '../components/PublicOnlyRoute';
import DetailThreadPage from '../pages/DetailThreadPage';
import CreateThreadPage from '../pages/CreateThreadPage';
import LeaderboardPage from '../pages/LeaderboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'threads/:id',
            element: (
              <ProtectedRoute>
                <DetailThreadPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'create',
            element: (
              <ProtectedRoute>
                <CreateThreadPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'leaderboards',
            element: (
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'login',
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        ),
      },
    ],
  },
]);
