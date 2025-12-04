import React, { useState, useEffect } from 'react';
import { Bell, Mail, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { notificationService } from '../services/email.service';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  const loadStatus = async () => {
    try {
      const data = await notificationService.getStatus();
      setStatus(data);
    } catch (error) {
      console.error('Error loading status:', error);
    }
  };

  const handleTriggerNotifications = async () => {
    if (hasExecuted) return;

    setLoading(true);
    setMessage(null);

    try {
      await notificationService.triggerCheck();
      setMessage({
        type: 'success',
        text: 'Verificación de notificaciones ejecutada correctamente'
      });
      setHasExecuted(true);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al ejecutar verificación de notificaciones'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-3">
            <Bell size={24} />
            <div>
              <h2 className="text-2xl font-bold">Sistema de Notificaciones</h2>
              <p className="text-indigo-100 text-sm">Configuración y pruebas de correo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">

          {status && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                Estado del Sistema
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-600 mb-1">Estado</p>
                  <p className={`font-semibold ${status.notificationsEnabled ? 'text-green-600' : 'text-red-600'}`}>
                    {status.notificationsEnabled ? '✓ Activo' : '✗ Inactivo'}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-600 mb-1">Días de anticipación</p>
                  <p className="font-semibold text-gray-800">{status.daysBefore} días</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                  <p className="text-xs text-gray-600 mb-1">Horario de ejecución</p>
                  <p className="font-semibold text-gray-800">{status.schedule}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Send size={20} />
              Verificación Manual
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Ejecuta manualmente la verificación de onboardings próximos a vencer. 
              Esto enviará correos a todos los colaboradores con onboardings que vencen en <strong>7 días o menos. </strong>
            </p>

            <button
              onClick={handleTriggerNotifications}
              disabled={loading || hasExecuted}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {hasExecuted ? 'Verificación Ejecutada' : loading ? 'Ejecutando...' : 'Ejecutar Verificación Ahora'}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            )}
          </div>
          <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <p className="text-sm text-amber-800">
              <strong> Las notificaciones automáticas se ejecutan diariamente a las 9:00 AM. </strong>
              Los correos se envían exactamente 7 días antes de la fecha de vencimiento del onboarding.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
