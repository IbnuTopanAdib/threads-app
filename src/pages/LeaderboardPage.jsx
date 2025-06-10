import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetLeaderboardsActionCreator } from '../states/leaderboards/action';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboards = async () => {
      try {
        await dispatch(asyncSetLeaderboardsActionCreator());
        setError(null);
      } catch {
        setError('Gagal memuat leaderboard. Coba lagi nanti.');
      }
    };

    loadLeaderboards();
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>

      {error && (
        <div className="text-red-600 font-medium mb-4">
          {error}
        </div>
      )}

      {leaderboards && leaderboards.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {leaderboards.map((item, index) => (
            <li key={item.user.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-600 w-6">
                  {index + 1}.
                </span>
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800 font-medium">{item.user.name}</span>
              </div>
              <span className="text-blue-600 font-bold text-lg">{item.score}</span>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className="text-gray-600">Memuat data leaderboard...</p>
      )}
    </div>
  );
};

export default LeaderboardPage;
