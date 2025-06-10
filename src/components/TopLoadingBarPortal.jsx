import React from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import LoadingBar from 'react-top-loading-bar';
import { useSelector } from 'react-redux';

const TopLoadingBarPortal = () => {
  const loadingRef = useRef(null);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) loadingRef.current.continuousStart();
    else loadingRef.current.complete();
  }, [isLoading]);

  const container = document.getElementById('loading-bar-root');
  if (!container) return null;

  return createPortal(
    <LoadingBar color="#3b82f6" height={3} ref={loadingRef} />,
    container
  );
};

export default TopLoadingBarPortal;
