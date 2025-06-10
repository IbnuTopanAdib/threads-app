import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';
import { Link } from 'react-router';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (error) {
      console.error('Gagal register:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 font-sans">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">NuThread</h1>
      <div className="bg-white rounded-lg shadow-md w-full max-w-md px-6 py-6">
        <h2 className="text-2xl font-bold text-center">Create a new account</h2>
        <p className="text-center text-sm text-gray-600 mb-4">It is quick and easy.</p>
        <RegisterForm onRegister={onRegister} />
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline text-sm">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
