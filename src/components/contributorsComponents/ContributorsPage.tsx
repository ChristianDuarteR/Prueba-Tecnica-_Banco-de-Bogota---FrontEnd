import React, { useState } from "react";
import useContributorApi from "../../hooks/useContributorApi";
import type { Contributor } from "../../interface/DataInterface";
import ContributorForm from "./ContributorForm";

const API_URL = import.meta.env.VITE_API_URL;

const ContributorsPage: React.FC = () => {
  const { contributors, loading, error, updateContributor, deleteContributor, addContributor } = useContributorApi(API_URL);

    const [editedContributors, setEditedContributors] = useState<
    Record<
        string,
        {
        firstName: string;
        lastName: string;
        joinDate: string; 
        bienvenida: boolean;
        tecnico: boolean;
        fechaTecnico: string; 
        }
    >
    >({});

  const [filter, setFilter] = useState("");

  const [showForm, setShowForm] = useState(false);


    const handleEdit = (email: string, field: string, value: any) => {
    setEditedContributors((prev) => ({
        ...prev,
        [email]: { ...prev[email], [field]: value },
    }));
    };


const formatDate = (date: string | Date | null) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const handleSave = async (email: string) => {
  const contributor = contributors.find((c) => c.email === email);
  if (!contributor) return;

  const edited = editedContributors[email];

  const joinDate = edited?.joinDate
    ? formatDate(edited.joinDate)
    : formatDate(contributor.joinDate);

  const updatedOnboardings: Contributor["onboardings"] = contributor.onboardings.map((ob) => {
    if (ob.type === "BIENVENIDA") return { ...ob, onBoardingStatus: edited?.bienvenida ?? ob.onBoardingStatus };
    if (ob.type === "TECNICO")
      return {
        ...ob,
        onBoardingStatus: edited?.tecnico ?? ob.onBoardingStatus,
        onBoardingTechnicalDateAssigned: edited?.fechaTecnico
          ? formatDate(edited.fechaTecnico)
          : ob.onBoardingTechnicalDateAssigned
          ? formatDate(ob.onBoardingTechnicalDateAssigned)
          : "",
      };
    return ob;
  });

  await updateContributor(email, {
    ...contributor,
    firstName: edited?.firstName ?? contributor.firstName,
    lastName: edited?.lastName ?? contributor.lastName,
    joinDate,
    onboardings: updatedOnboardings,
  });


  setEditedContributors((prev) => {
    const copy = { ...prev };
    delete copy[email];
    return copy;
  });
};



  const handleDelete = async (email: string) => {
    const contributor = contributors.find((c) => c.email === email);
    if (!contributor) return;

    await deleteContributor(email);
    setEditedContributors((prev) => {
      const copy = { ...prev };
      delete copy[email];
      return copy;
    });
  };

const mappedContributors = contributors
  .filter(
    (c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(filter.toLowerCase()) ||
      c.email.toLowerCase().includes(filter.toLowerCase())
  )
  .map((c) => {
    const edited = editedContributors[c.email];
    const firstName = edited?.firstName ?? c.firstName;
    const lastName = edited?.lastName ?? c.lastName;
    const joinDate = edited?.joinDate ?? (c.joinDate ? c.joinDate.substring(0, 10) : "");
    const bienvenida =
      edited?.bienvenida ?? c.onboardings.find((o) => o.type === "BIENVENIDA")?.onBoardingStatus ?? false;
    const tecnico =
      edited?.tecnico ?? c.onboardings.find((o) => o.type === "TECNICO")?.onBoardingStatus ?? false;
    const fechaTecnico =
      edited?.fechaTecnico ??
      (c.onboardings.find((o) => o.type === "TECNICO")?.onBoardingTechnicalDateAssigned
        ? c.onboardings.find((o) => o.type === "TECNICO")!.onBoardingTechnicalDateAssigned.substring(0, 10)
        : "");

    return { email: c.email, firstName, lastName, joinDate, bienvenida, tecnico, fechaTecnico };
  });


  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", width: "100vw", height: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Colaboradores</h1>

      <div style={{ marginBottom: 20, textAlign: "center" }}>
        <input
          type="text"
          placeholder="Filtrar por nombre o email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            width: 400,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 14,
          }}
        />
      </div>

        <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{ marginBottom: 10, padding: "6px 12px", borderRadius: 6 }}
        >
        {showForm ? "Cerrar formulario" : "Nuevo colaborador"}
        </button>

        {showForm && (
        <ContributorForm
            onCreate={async (newContributor) => {
            await addContributor(newContributor);
            setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
        />
        )}

      {loading && <p style={{ textAlign: "center" }}>Cargando...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ overflowX: "auto", height: "80vh" }}>
          <table
            style={{
              width: "100%",
              minWidth: 900,
              borderCollapse: "separate",
              borderSpacing: 0,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#646cff", color: "#fff" }}>
              <tr>
                <th style={{ padding: 12 }}>Nombre Completo</th>
                <th>Email</th>
                <th>Fecha de Ingreso</th>
                <th>Bienvenida</th>
                <th>Técnico</th>
                <th>Fecha Técnico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mappedContributors.map((row, index) => (
                <tr
                  key={row.email}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    transition: "background 0.3s",
                  }}
                >
                  <td style={{ padding: 8 }}>
                    <input
                        style={{ width: "90%", padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                        value={`${row.firstName} ${row.lastName}`}
                        onChange={(e) => {
                            const [f, ...l] = e.target.value.split(" ");
                            handleEdit(row.email, "firstName", f);
                            handleEdit(row.email, "lastName", l.join(" "));
                        }}
                    />

                  </td>
                  <td style={{ color: "#2c7be5" }}>{row.email}</td>
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
                      style={{ width: 20, height: 20 }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={row.tecnico}
                      onChange={(e) => handleEdit(row.email, "tecnico", e.target.checked)}
                      style={{ width: 20, height: 20 }}
                    />
                  </td>
                  <td>
                    {row.tecnico ? (
                      <input
                        type="date"
                        value={row.fechaTecnico}
                        onChange={(e) => handleEdit(row.email, "fechaTecnico", e.target.value)}
                        style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
                      />
                    ) : (
                      <span style={{ color: "#888" }}>No aplica</span>
                    )}
                  </td>
                  <td style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                    <button
                      onClick={() => handleSave(row.email)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                      onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#218838")}
                      onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#28a745")}
                    >
                      Actualizar
                    </button>
                    <button
                      onClick={() => handleDelete(row.email)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                      onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#c82333")}
                      onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "#dc3545")}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContributorsPage;
