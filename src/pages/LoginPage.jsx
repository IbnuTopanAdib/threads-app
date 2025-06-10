import React from 'react';
import LoginForm from '../components/LoginForm';
import Branding from '../components/Branding';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row max-w-5xl w-full items-center justify-between gap-12">
        <Branding />
        <div className="md:w-[396px] w-full bg-white p-6 rounded-lg shadow-lg">
          <LoginForm onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
