import React, { useState } from "react";
import Table from "../simpleComponents/Table";
import useContributorApi from "../../hooks/useContributorApi";
import type { Contributor } from "../../interface/ContributorInterface";

const API_URL = import.meta.env.VITE_API_URL;

const ContributorsPage: React.FC = () => {
  const { contributors, loading, error, updateContributor } = useContributorApi(API_URL);

  const [editedContributors, setEditedContributors] = useState<
    Record<string, { name: string; bienvenida: boolean; tecnico: boolean; fechaTecnico: string }>
  >({});

  const [filter, setFilter] = useState("");

  const handleEdit = (email: string, field: string, value: any) => {
    setEditedContributors((prev) => ({
      ...prev,
      [email]: { ...prev[email], [field]: value },
    }));
  };

  const handleSave = async (email: string) => {
    const contributor = contributors.find((c) => c.email === email);
    if (!contributor) return;

    const edited = editedContributors[email];
    const updatedOnboardings: Contributor["onboardings"] = contributor.onboardings.map((ob) => {
      if (ob.type === "BIENVENIDA") return { ...ob, onBoardingStatus: edited.bienvenida };
      if (ob.type === "TECNICO") {
        return {
          ...ob,
          onBoardingStatus: edited.tecnico,
          onBoardingTechnicalDateAssigned: new Date(edited.fechaTecnico).toISOString(),
        };
      }
      return ob;
    });

    await updateContributor(email, {
      ...contributor,
      firstName: edited.name.split(" ")[0],
      lastName: edited.name.split(" ")[1] ?? "",
      onboardings: updatedOnboardings,
    });

    setEditedContributors((prev) => {
      const copy = { ...prev };
      delete copy[email];
      return copy;
    });
  };

  // Mapear colaboradores con edición inline
  const mappedContributors = contributors
    .filter((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(filter.toLowerCase()))
    .map((c) => {
      const edited = editedContributors[c.email];
      const name = edited?.name ?? `${c.firstName} ${c.lastName}`;
      const bienvenida = edited?.bienvenida ?? c.onboardings.find((o) => o.type === "BIENVENIDA")?.onBoardingStatus ?? false;
      const tecnico = edited?.tecnico ?? c.onboardings.find((o) => o.type === "TECNICO")?.onBoardingStatus ?? false;
      const fechaTecnico =
        edited?.fechaTecnico ??
        (c.onboardings.find((o) => o.type === "TECNICO")?.onBoardingTechnicalDateAssigned
          ? new Date(c.onboardings.find((o) => o.type === "TECNICO")!.onBoardingTechnicalDateAssigned).toISOString().substring(0, 10)
          : "");

      return { email: c.email, name, joinDate: new Date(c.joinDate).toISOString().substring(0, 10), bienvenida, tecnico, fechaTecnico };
    });

  return (
    <div style={{ padding: 20 }}>
      <h1>Colaboradores</h1>

      {/* Filtro */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha ingreso</th>
              <th>Onboarding Bienvenida</th>
              <th>Onboarding Técnico</th>
              <th>Fecha onboarding técnico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mappedContributors.map((row) => (
              <tr key={row.email} style={{ borderBottom: "1px solid #ccc" }}>
                <td>
                  <input
                    style={{ width: "100%" }}
                    value={row.name}
                    onChange={(e) => handleEdit(row.email, "name", e.target.value)}
                  />
                </td>
                <td>{row.email}</td>
                <td>
                  <input
                    type="date"
                    value={row.joinDate}
                    onChange={(e) => handleEdit(row.email, "joinDate", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.bienvenida}
                    onChange={(e) => handleEdit(row.email, "bienvenida", e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.tecnico}
                    onChange={(e) => handleEdit(row.email, "tecnico", e.target.checked)}
                  />
                </td>
                <td>
                  {row.tecnico ? (
                    <input
                      type="date"
                      value={row.fechaTecnico}
                      onChange={(e) => handleEdit(row.email, "fechaTecnico", e.target.value)}
                    />
                  ) : (
                    "No aplica"
                  )}
                </td>
                <td>
                  <button onClick={() => handleSave(row.email)}>Actualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContributorsPage;
