import React from 'react';
import { User } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <User className="mx-auto text-gray-400 mb-4" size={48} />
      <p className="text-gray-600">No se encontraron Colaboradores</p>
    </div>
  );
};