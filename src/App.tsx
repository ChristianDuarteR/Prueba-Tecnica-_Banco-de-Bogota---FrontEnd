import React, { useState, useEffect } from 'react';
import { contributorService } from './services/contributor.service';
import { Header } from './components/Header';
import { ErrorMessage } from './components/ErrorMessage';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { ContributorCard } from './components/ContributorCard';
import { ContributorModal } from './components/ContributorModal';
import { ContributorDto, OnboardingDto, OnboardingType } from './types/contributor.types';
import { CalendarPanel } from './components/CalendarPanel';
import { NotificationPanel } from './components/NotificationPanel';

interface FilterState {
  types: OnboardingType[];
  statuses: ('completed' | 'pending')[];
}

export default function App() {
  const [contributors, setContributors] = useState<ContributorDto[]>([]);
  const [filteredContributors, setFilteredContributors] = useState<ContributorDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({ types: [], statuses: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingContributor, setEditingContributor] = useState<ContributorDto | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); 

  const [formData, setFormData] = useState<ContributorDto>({
    firstName: '',
    lastName: '',
    email: '',
    joinDate: new Date().toISOString().split('T')[0],
    onboardings: [],
  });

  useEffect(() => {
    loadContributors();
  }, []);

  useEffect(() => {
    let filtered = contributors.filter(c =>
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.types.length > 0 || filters.statuses.length > 0) {
      filtered = filtered.filter(contributor => {
        if (!contributor.onboardings || contributor.onboardings.length === 0) {
          return false;
        }

        const hasMatchingType = filters.types.length === 0 || 
          contributor.onboardings.some((onb: { type: any; }) => filters.types.includes(onb.type));

        const hasMatchingStatus = filters.statuses.length === 0 || 
          contributor.onboardings.some((onb: { onBoardingStatus: any; }) => {
            if (filters.statuses.includes('completed') && onb.onBoardingStatus) return true;
            if (filters.statuses.includes('pending') && !onb.onBoardingStatus) return true;
            return false;
          });

        return hasMatchingType && hasMatchingStatus;
      });
    }

    setFilteredContributors(filtered);
  }, [searchTerm, contributors, filters]);

  const loadContributors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await contributorService.getAll();
      setContributors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (editingContributor) {
        await contributorService.update(editingContributor.email, formData);
      } else {
        await contributorService.create(formData);
      }
      await loadContributors();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la operación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm('¿Está seguro de eliminar este contributor?')) return;

    setIsLoading(true);
    setError(null);
    try {
      await contributorService.delete(email);
      await loadContributors();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (contributor?: ContributorDto) => {
    if (contributor) {
      setEditingContributor(contributor);
      setFormData(contributor);
    } else {
      setEditingContributor(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
        onboardings: [],
      });
    }
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContributor(null);
    setError(null);
  };

  const handleFormChange = (data: Partial<ContributorDto>) => {
    setFormData({ ...formData, ...data });
  };

  const addOnboarding = () => {
    setFormData({
      ...formData,
      onboardings: [
        ...formData.onboardings,
        {
          type: OnboardingType.TECNICO,
          onBoardingStatus: false,
          onBoardingTechnicalDateAssigned: new Date().toISOString().split('T')[0],
          title: ''
        },
      ],
    });
  };

  const removeOnboarding = (index: number) => {
    setFormData({
      ...formData,
      onboardings: formData.onboardings.filter((_, i) => i !== index),
    });
  };

  const updateOnboarding = (index: number, field: keyof OnboardingDto, value: any) => {
    const updated = [...formData.onboardings];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, onboardings: updated });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Header 
            onOpenCalendar={() => setIsCalendarOpen(true)} 
            onOpenNotification={() => setIsNotificationOpen(true)} 
          />
        <ErrorMessage message={error} />
        <SearchBar 
          searchTerm={searchTerm}
          filters={filters}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilters}
          onNewContributor={() => openModal()}
        />

        {isLoading && !isModalOpen ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredContributors.map((contributor) => (
              <ContributorCard
                key={contributor.email}
                contributor={contributor}
                onEdit={openModal}
                onDelete={handleDelete}
              />
            ))}
            {filteredContributors.length === 0 && <EmptyState />}
          </div>
        )}

        <ContributorModal
          isOpen={isModalOpen}
          isEditing={!!editingContributor}
          formData={formData}
          isLoading={isLoading}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          onAddOnboarding={addOnboarding}
          onUpdateOnboarding={updateOnboarding}
          onRemoveOnboarding={removeOnboarding}
        />
        <CalendarPanel
          isOpen={isCalendarOpen}
          contributors={contributors}
          onClose={() => setIsCalendarOpen(false)}
        />

        <NotificationPanel 
          isOpen={isNotificationOpen} 
          onClose={() => setIsNotificationOpen(false)}
        />

      </div>
    </div>
  );
}