import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { asyncPreloadProcess } from './states/isPreload/action';
import TopLoadingBarPortal from './components/TopLoadingBarPortal';
import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="colored"
      />
      <TopLoadingBarPortal />
      <Outlet />
    </>
  );
}

export default App;
