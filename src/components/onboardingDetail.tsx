import React from "react";
import { OnboardingDetailProps } from "../types/contributor.types";

export const OnboardingDetail: React.FC<OnboardingDetailProps> = ({ selectedEvent, onClose }) => {

  if (!selectedEvent) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Detalle del Onboarding</h3>

        <p><b>Contributor:</b> {selectedEvent.contributorName}</p>
        <p><b>Email:</b> {selectedEvent.contributorEmail}</p>
        <p><b>Tipo:</b> {selectedEvent.type}</p>
        <p>
          <b>Estado:</b>{" "}
          {selectedEvent.status ? "Completado" : "Pendiente"}
        </p>
        <p><b>Fecha:</b> {selectedEvent.date}</p>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};