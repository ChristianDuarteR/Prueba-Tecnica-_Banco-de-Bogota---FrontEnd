export interface Onboarding {
  type: "BIENVENIDA" | "TECNICO";
  onBoardingStatus: boolean;
  onBoardingTechnicalDateAssigned?: string | null;
}

export interface Contributor {
  email: number;
  firstName: string;
  lastName: string;
  joinDate: string;
  onboardings: Onboarding[];
}
