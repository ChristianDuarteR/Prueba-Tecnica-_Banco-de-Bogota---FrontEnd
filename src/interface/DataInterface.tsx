export interface Onboarding {
  type: "BIENVENIDA" | "TECNICO";
  onBoardingStatus: boolean;
  onBoardingTechnicalDateAssigned?: string | null;
}

export interface Contributor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  onboardings: Onboarding[];
}
