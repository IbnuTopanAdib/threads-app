import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ label, ...props }) => {
  return (
    <input
      placeholder={label}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};

export default InputText;

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object
};