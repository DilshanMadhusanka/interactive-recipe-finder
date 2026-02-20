import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="max-w-md mx-auto my-10 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-700">
      <AlertCircle className="shrink-0 mt-0.5" size={20} />
      <div>
        <h4 className="font-bold mb-1">Oops! Something went wrong</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
