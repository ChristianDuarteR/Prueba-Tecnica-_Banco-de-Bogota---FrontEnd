import React, { useState } from "react";
import Button from "../simpleComponents/Button";
import InputField from "../simpleComponents/InputField";
import type { Contributor } from "../../interface/ContributorInterface";

interface Props {
  onSubmit: (data: Omit<Contributor, "id">) => void;
  onClose: () => void;
  initialData?: Omit<Contributor, "id">;
}

const ContributorForm: React.FC<Props> = ({ onSubmit, onClose, initialData }) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [joinDate, setJoinDate] = useState(initialData?.joinDate || "");
  const [onboardings, setOnboardings] = useState(initialData?.onboardings || [
    { type: "BIENVENIDA", onBoardingStatus: false },
    { type: "TECNICO", onBoardingStatus: false, onBoardingTechnicalDateAssigned: null }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email: "", joinDate, onboardings });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Nombre" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <InputField label="Apellido" value={lastName} onChange={e => setLastName(e.target.value)} />
      <InputField label="Fecha de ingreso" type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} />
      <div style={{ marginTop: "12px" }}>
        <Button label="Guardar" type="submit" />
        <Button label="Cancelar" variant="secondary" onClick={onClose} style={{ marginLeft: "10px" }} />
      </div>
    </form>
  );
};

export default ContributorForm;
