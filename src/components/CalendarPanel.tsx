import React, { useMemo } from 'react';
import { X, Calendar as CalendarIcon, User, CheckCircle, XCircle } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarPanelProps } from '@/types/contributor.types';


export const CalendarPanel: React.FC<CalendarPanelProps> = ({ 
  isOpen, 
  contributors, 
  onClose 
}) => {
  const events = useMemo(() => {
    const calendarEvents: any[] = [];
    
    contributors.forEach(contributor => {
      contributor.onboardings.forEach(onboarding => {
        calendarEvents.push({
          title: `${contributor.firstName} ${contributor.lastName}`,
          date: onboarding.onBoardingTechnicalDateAssigned,
          backgroundColor: onboarding.onBoardingStatus ? '#10b981' : '#f59e0b',
          borderColor: onboarding.onBoardingStatus ? '#059669' : '#d97706',
          extendedProps: {
            contributorName: `${contributor.firstName} ${contributor.lastName}`,
            contributorEmail: contributor.email,
            type: onboarding.type,
            status: onboarding.onBoardingStatus,
          },
        });
      });
    });
    
    return calendarEvents;
  }, [contributors]);

  const renderEventContent = (eventInfo: any) => {
    const { contributorName, type, status } = eventInfo.event.extendedProps;
    
    return (
      <div className="p-1 text-xs">
        <div className="flex items-center gap-1">
          {status ? (
            <CheckCircle size={12} className="flex-shrink-0" />
          ) : (
            <XCircle size={12} className="flex-shrink-0" />
          )}
          <span className="font-semibold truncate">{contributorName}</span>
        </div>
        <div className="text-[10px] opacity-90">{type}</div>
      </div>
    );
  };

  return (
<>
    <div 
    className={`fixed inset-0 z-40 bg-black transition-opacity duration-700 ease-in-out ${
        isOpen ? 'bg-opacity-30 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
    }`}
    onClick={onClose}
    />

      
    <div className={`fixed top-0 right-0 h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-2xl z-50 transform transition-transform duration-700 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon size={28} />
            <div>
              <h2 className="text-2xl font-bold">Calendario de Onboardings</h2>
              <p className="text-blue-100 text-sm">Visualiza todas las fechas asignadas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <User size={16} />
              <span>Colaboradores</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{contributors.length}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
              <CheckCircle size={16} />
              <span>Completados</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {events.filter(e => e.extendedProps.status).length}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 text-sm mb-1">
              <XCircle size={16} />
              <span>Pendientes</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">
              {events.filter(e => !e.extendedProps.status).length}
            </p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto" style={{ height: 'calc(100vh - 240px)' }}>
          <div className="bg-white rounded-xl shadow-lg p-4">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventContent={renderEventContent}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
              }}
              locale="es"
              height="auto"
              eventClick={(info) => {
                const { contributorName, contributorEmail, type, status } = info.event.extendedProps;
                alert(
                  `Contributor: ${contributorName}\n` +
                  `Email: ${contributorEmail}\n` +
                  `Tipo: ${type}\n` +
                  `Estado: ${status ? 'Completado' : 'Pendiente'}\n` +
                  `Fecha: ${info.event.startStr}`
                );
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};