import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-stone-500 font-medium">Fetching delicious recipes...</p>
    </div>
  );
};

export default Loader;
