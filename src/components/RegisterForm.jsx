import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import InputText from './ui/InputText';
import ButtonSecondary from './ui/ButtonSecondary';

const RegisterForm = ({ onRegister }) => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    onRegister({ name, email, password });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <InputText
        type="text"
        label="Full name"
        value={name}
        onChange={onNameChange}
      />

      <InputText
        type="email"
        label="Email"
        value={email}
        onChange={onEmailChange}
      />

      <InputText
        type="password"
        label="Password"
        value={password}
        onChange={onPasswordChange}
      />

      <ButtonSecondary label="Daftar" type="submit"/>
    </form>
  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  onRegister: PropTypes.func.isRequired
};