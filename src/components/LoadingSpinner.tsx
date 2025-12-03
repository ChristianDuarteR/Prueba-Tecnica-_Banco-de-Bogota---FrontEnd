import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  );
};