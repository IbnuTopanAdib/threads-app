import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrimary = ({ label, ...props }) => {
  return (
    <button
      className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition"
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object
};
