import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { OnboardingFormItem } from './OnboardingFormItem';
import {  ContributorModalProps, FormErrors } from '@/src/types/contributor.types';


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
  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'La fecha de ingreso es obligatoria';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
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
                value={formData.firstName}
                onChange={(e) => onFormChange({ firstName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.firstName
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => onFormChange({ lastName: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.lastName
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                disabled={isEditing}
                value={formData.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 disabled:bg-gray-100 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => onFormChange({ joinDate: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                  errors.joinDate
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.joinDate && <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>}
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
              onClick={handleSubmit}
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
