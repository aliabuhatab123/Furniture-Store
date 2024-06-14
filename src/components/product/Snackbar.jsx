import React from 'react';

const Snackbar = ({ message, show }) => {
  return (
    <div className={`fixed bottom-4 right-4 w-1/4 bg-blue-600 text-white p-4 rounded-lg transition-transform duration-300 ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      {message}
    </div>
  );
};

export default Snackbar;
