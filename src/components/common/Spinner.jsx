import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12"></div>
      <div className="ml-4 text-lg sm:text-xl text-blue-500 animate-pulse">Loading...</div>
    </div>
  );
};

export default Spinner;
