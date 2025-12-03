import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema de Colaborador - OnBoarding</h1>
      <p className="text-gray-600">No olvides revisar el calendario para verificar su agenda!!</p>
    </div>
  );
};