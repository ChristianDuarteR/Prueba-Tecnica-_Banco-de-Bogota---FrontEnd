import React from 'react';
import { Trash2 } from 'lucide-react';
import { OnboardingDto, OnboardingFormItemProps, OnboardingType } from '../types/contributor.types';

export const OnboardingFormItem: React.FC<OnboardingFormItemProps> = ({
  onboarding,
  index,
  onUpdate,
  onRemove,
}) => {

  const isTitleInvalid = !onboarding.title || !onboarding.title.trim();

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Onboarding {index + 1}</span>
        <button
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {/* TIPO */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
          <select
            value={onboarding.type}
            onChange={(e) => onUpdate(index, 'type', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={OnboardingType.TECNICO}>On-Boarding Técnico</option>
            <option value={OnboardingType.BIENVENIDA}>On-Boarding de Bienvenida</option>
          </select>
        </div>

        {/* FECHA */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Fecha Asignada</label>
          <input
            type="date"
            value={onboarding.onBoardingTechnicalDateAssigned}
            onChange={(e) =>
              onUpdate(index, 'onBoardingTechnicalDateAssigned', e.target.value)
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TITULO OBLIGATORIO */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Título de Reunión <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={onboarding.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 ${
              isTitleInvalid
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Ej: Journey to Cloud"
          />
          {isTitleInvalid && (
            <p className="text-xs text-red-500 mt-1">
              El título es obligatorio
            </p>
          )}
        </div>

        {/* COMPLETADO */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onboarding.onBoardingStatus}
              onChange={(e) =>
                onUpdate(index, 'onBoardingStatus', e.target.checked)
              }
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Onboarding Completado</span>
          </label>
        </div>
      </div>
    </div>
  );
};
