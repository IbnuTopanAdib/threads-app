import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetUsersAndThreads } from '../states/shared/action';
import ThreadList from '../components/ThreadList';

const HomePage = () => {
  const dispatch = useDispatch();
  const { threads, users } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncSetUsersAndThreads());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-2xl w-full mt-6">
        <ThreadList threads={threads} users={users} />
      </div>
    </div>
  );
};

export default HomePage;
