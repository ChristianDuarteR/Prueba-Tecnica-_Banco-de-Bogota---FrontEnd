import React from 'react';
import { Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenCalendar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalendar }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Sistema de Colaborador - OnBoarding
        </h1>
        <p className="text-gray-600">
          No olvides revisar el calendario para verificar su agenda!!
        </p>
      </div>

      <button
        onClick={onOpenCalendar}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        <Calendar size={18} />
        Ver calendario
      </button>
    </div>
  );
};
