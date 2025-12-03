import React from 'react';
import { Edit2, Trash2, Mail, Calendar } from 'lucide-react';
import { OnboardingItem } from './OnboardingItem';
import { ContributorDto } from '@/src/types/contributor.types';

interface ContributorCardProps {
  contributor: ContributorDto;
  onEdit: (contributor: ContributorDto) => void;
  onDelete: (email: string) => void;
}

export const ContributorCard: React.FC<ContributorCardProps> = ({ 
  contributor, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {contributor.firstName} {contributor.lastName}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {contributor.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                Ingreso: {contributor.joinDate.split('-').reverse().join('/')}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(contributor)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => onDelete(contributor.email)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {contributor.onboardings.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Onboardings</h4>
            <div className="grid gap-3">
              {contributor.onboardings.map((onboarding, idx) => (
                <OnboardingItem key={idx} onboarding={onboarding} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};