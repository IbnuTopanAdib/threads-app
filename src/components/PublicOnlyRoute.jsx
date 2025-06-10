import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicOnlyRoute = ({ children }) => {
  const authUser = useSelector((state) => state.authUser); // ✅ ambil hanya yang dibutuhkan

  if (authUser) return <Navigate to="/" replace />;
  return children;
};

PublicOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicOnlyRoute;
