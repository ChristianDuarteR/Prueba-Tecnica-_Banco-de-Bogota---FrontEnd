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