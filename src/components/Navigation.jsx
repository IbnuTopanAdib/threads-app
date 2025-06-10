import React from 'react';
import { FaHome, FaPlus, FaTrophy } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <nav className="flex gap-8 items-center">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-1 px-2 py-1 rounded-md transition ${
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-500'
          }`
        }
      >
        <FaHome className="text-xl" />
        <span className="hidden sm:inline">Home</span>
      </NavLink>

      <NavLink
        to="/create"
        className={({ isActive }) =>
          `flex items-center gap-1 px-2 py-1 rounded-md transition ${
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-500'
          }`
        }
      >
        <FaPlus className="text-xl" />
        <span className="hidden sm:inline">Create</span>
      </NavLink>

      <NavLink
        to="/leaderboards"
        className={({ isActive }) =>
          `flex items-center gap-1 px-2 py-1 rounded-md transition ${
            isActive
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-blue-500'
          }`
        }
      >
        <FaTrophy className="text-xl" />
        <span className="hidden sm:inline">Leaderboard</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
