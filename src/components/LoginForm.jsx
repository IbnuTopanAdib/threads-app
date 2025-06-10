import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Email dan kata sandi tidak boleh kosong');
      return;
    }
    onLogin({ email, password });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={onEmailChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Kata Sandi"
        className="px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={onPasswordChange}
      />
      <button className="bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        type="submit"
      >
                Masuk
      </button>
      <a
        href="#"
        className="text-sm text-blue-600 text-center hover:underline"
      >
                Lupa kata sandi?
      </a>
      <hr className="my-2" />
      <Link className="bg-green-500 text-white text-base font-semibold py-3 rounded-md hover:bg-green-600 transition w-fit mx-auto px-6 mb-4"
        to="/register">
                Buat Akun Baru
      </Link>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};