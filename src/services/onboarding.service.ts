import { OnboardingDto } from '../../types/contributor.types'
const API_BASE_URL = 'http://localhost:8080/api/v1/onboardings';


export const onboardingService = {
  getAll: async (): Promise<OnboardingDto[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener los onBoardings registrados');
    return response.json();
  },
}