import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ label, ...props }) => {
  return (
    <textarea
      placeholder={label}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
      {...props}
    />
  );
};

export default TextArea;

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object
};
