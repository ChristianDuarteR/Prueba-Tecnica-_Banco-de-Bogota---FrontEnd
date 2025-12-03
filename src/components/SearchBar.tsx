import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { OnboardingType } from '../../types/contributor.types'

interface FilterState {
  types: OnboardingType[];
  statuses: ('completed' | 'pending')[];
}

interface SearchBarProps {
  searchTerm: string;
  filters: FilterState;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onNewContributor: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  filters,
  onSearchChange, 
  onFilterChange,
  onNewContributor 
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const toggleType = (type: OnboardingType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFilterChange({ ...filters, types: newTypes });
  };

  const toggleStatus = (status: 'completed' | 'pending') => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFilterChange({ ...filters, statuses: newStatuses });
  };

  const clearFilters = () => {
    onFilterChange({ types: [], statuses: [] });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.statuses.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-lg flex items-center gap-2 transition-colors ${
              hasActiveFilters 
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter size={20} />
            Filtros
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {filters.types.length + filters.statuses.length}
              </span>
            )}
          </button>
          <button
            onClick={onNewContributor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <Plus size={20} />
            Nuevo Contributor
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="border-t pt-4 mt-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Tipo de Onboarding</h4>
              </div>
              <div className="space-y-2">
                {Object.values(OnboardingType).map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Estado</h4>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes('completed')}
                    onChange={() => toggleStatus('completed')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Completado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes('pending')}
                    onChange={() => toggleStatus('pending')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Pendiente</span>
                </label>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};