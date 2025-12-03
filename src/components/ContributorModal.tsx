import React from 'react';
import { X, Plus } from 'lucide-react';
import { OnboardingFormItem } from './OnboardingFormItem';
import { ContributorDto, OnboardingDto } from '@/types/contributor.types';

interface ContributorModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: ContributorDto;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onFormChange: (data: Partial<ContributorDto>) => void;
  onAddOnboarding: () => void;
  onUpdateOnboarding: (index: number, field: keyof OnboardingDto, value: any) => void;
  onRemoveOnboarding: (index: number) => void;
}

export const ContributorModal: React.FC<ContributorModalProps> = ({
  isOpen,
  isEditing,
  formData,
  isLoading,
  onClose,
  onSubmit,
  onFormChange,
  onAddOnboarding,
  onUpdateOnboarding,
  onRemoveOnboarding,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar Contributor' : 'Nuevo Contributor'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => onFormChange({ firstName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => onFormChange({ lastName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                disabled={isEditing}
                value={formData.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
              <input
                type="date"
                required
                value={formData.joinDate}
                onChange={(e) => onFormChange({ joinDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Onboardings</h3>
              <button
                onClick={onAddOnboarding}
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={16} />
                Agregar Onboarding
              </button>
            </div>

            <div className="space-y-4">
              {formData.onboardings.map((onboarding, index) => (
                <OnboardingFormItem
                  key={index}
                  onboarding={onboarding}
                  index={index}
                  onUpdate={onUpdateOnboarding}
                  onRemove={onRemoveOnboarding}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};