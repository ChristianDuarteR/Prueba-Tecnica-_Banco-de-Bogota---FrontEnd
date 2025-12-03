import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { OnboardingDto } from '../types/contributor.types'
import { normalizeDate } from '../utils/dateFormat'
interface OnboardingItemProps {
  onboarding: OnboardingDto;
}

export const OnboardingItem: React.FC<OnboardingItemProps> = ({ onboarding }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onboarding.onBoardingStatus ? (
          <CheckCircle className="text-green-600" size={20} />
        ) : (
          <XCircle className="text-gray-400" size={20} />
        )}
        <div>
          <p className="font-medium text-gray-800">{onboarding.title}</p>
          <p className="text-xs text-gray-600">
          <p className='font-medium text-gray-900'>{onboarding.type} </p>
              Fecha Estimada: {normalizeDate(onboarding.onBoardingTechnicalDateAssigned)}
          </p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        onboarding.onBoardingStatus
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-200 text-gray-700'
      }`}>
        {onboarding.onBoardingStatus ? 'Completado' : 'Pendiente'}
      </span>
    </div>
  );
};