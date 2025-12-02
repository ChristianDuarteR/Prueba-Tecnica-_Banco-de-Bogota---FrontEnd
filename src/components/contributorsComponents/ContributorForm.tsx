import React, { useState } from "react";
import type { Contributor } from "../../interface/DataInterface";

interface ContributorFormProps {
  onCreate: (newContributor: Omit<Contributor, "email">) => Promise<void>;
  onCancel?: () => void;
}

const ContributorForm: React.FC<ContributorFormProps> = ({ onCreate, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [bienvenida, setBienvenida] = useState(false);
  const [tecnico, setTecnico] = useState(false);
  const [fechaTecnico, setFechaTecnico] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !joinDate) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const newContributor: Omit<Contributor, "email"> = {
      firstName,
      lastName,
      email,
      joinDate,
      onboardings: [
        { type: "BIENVENIDA", onBoardingStatus: bienvenida },
        {
          type: "TECNICO",
          onBoardingStatus: tecnico,
          onBoardingTechnicalDateAssigned: tecnico ? fechaTecnico : "",
        },
      ],
    };

    await onCreate(newContributor);

    setFirstName("");
    setLastName("");
    setEmail("");
    setJoinDate("");
    setBienvenida(false);
    setTecnico(false);
    setFechaTecnico("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 20,
        marginBottom: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        maxWidth: 500,
      }}
    >
      <h2>Nuevo Colaborador</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Fecha de Ingreso"
        value={joinDate}
        onChange={(e) => setJoinDate(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={bienvenida}
          onChange={(e) => setBienvenida(e.target.checked)}
        />
        Bienvenida
      </label>

      <label>
        <input
          type="checkbox"
          checked={tecnico}
          onChange={(e) => setTecnico(e.target.checked)}
        />
        Técnico
      </label>

      {tecnico && (
        <input
          type="date"
          value={fechaTecnico}
          onChange={(e) => setFechaTecnico(e.target.value)}
        />
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Crear
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "none",
              backgroundColor: "#dc3545",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ContributorForm;
