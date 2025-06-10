import React from 'react';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { useDispatch } from 'react-redux';

const RootLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-blue-600">NuThread</h1>
          </div>
          <Navigation />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-2 py-1 text-red-500 hover:text-red-600 transition text-sm"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
