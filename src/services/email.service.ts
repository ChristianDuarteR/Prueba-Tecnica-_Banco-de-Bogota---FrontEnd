const API_BASE_URL = 'http://localhost:8080/api/v1/emails';

export const notificationService = {
  triggerCheck: async (): Promise<{ message: string; status: string }> => {
    const response = await fetch(`${API_BASE_URL}?manual=true`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Error al disparar notificaciones');
    return response.json();
  },

  getStatus: async (): Promise<{ notificationsEnabled: boolean; daysBefore: number; schedule: string }> => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Error al obtener estado');
    return response.json();
  },
};