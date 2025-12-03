import { ContributorDto } from "@/types/contributor.types";

const API_BASE_URL = 'http://localhost:8080/api/v1/contributors';

export const contributorService = {
  getAll: async (): Promise<ContributorDto[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Error al obtener los Colaboradores');
    return response.json();
  },

  getByEmail: async (email: string): Promise<ContributorDto> => {
    const response = await fetch(`${API_BASE_URL}/${email}`);
    if (!response.ok) throw new Error('Contributor no encontrado');
    return response.json();
  },

  create: async (contributor: ContributorDto): Promise<ContributorDto> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contributor),
    });
    if (!response.ok) {
      const error = response.headers.get('X-Error-Message') || 'Parece que este Colaborador ya existe';
      throw new Error(error);
    }
    return response.json();
  },

  update: async (email: string, contributor: ContributorDto): Promise<ContributorDto> => {
    const response = await fetch(`${API_BASE_URL}/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contributor),
    });
    if (!response.ok) {
      const error = response.headers.get('X-Error-Message') || 'Error al actualizar contributor';
      throw new Error(error);
    }
    return response.json();
  },

  delete: async (email: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${email}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = response.headers.get('X-Error-Message') || 'Error al eliminar contributor';
      throw new Error(error);
    }
  },
};