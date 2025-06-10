import React from 'react';
import PropTypes from 'prop-types';

const ButtonSecondary = ({ label, ...props }) => {
  return (
    <button
      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 mt-2 rounded-md text-lg"
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonSecondary;

ButtonSecondary.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object,
};
