export enum OnboardingType {
  TECNICO = 'TECNICO',
  BIENVENIDA = 'BIENVENIDA',
}

export interface OnboardingDto {
  id?: string;
  type: OnboardingType;
  title: string;
  onBoardingStatus: boolean;
  onBoardingTechnicalDateAssigned: string;
  contributorId?: string;
}

export interface ContributorDto {
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  onboardings: OnboardingDto[];
}

export interface ContributorCardProps {
  contributor: ContributorDto;
  onEdit: (contributor: ContributorDto) => void;
  onDelete: (email: string) => void;
}

export interface CalendarPanelProps {
  isOpen: boolean;
  contributors: ContributorDto[];
  onClose: () => void;
}

export interface OnboardingFormItemProps {
  onboarding: OnboardingDto;
  index: number;
  onUpdate: (index: number, field: keyof OnboardingDto, value: any) => void;
  onRemove: (index: number) => void;
}

export interface OnboardingDetailProps {
  selectedEvent: {
    contributorName: string;
    contributorEmail: string;
    type: string;
    status: boolean;
    date: string;
  };
  onClose: () => void;
}
