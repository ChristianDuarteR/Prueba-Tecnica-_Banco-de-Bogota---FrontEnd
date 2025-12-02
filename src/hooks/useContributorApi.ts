import { useState, useEffect } from "react";
import type { Contributor } from "../interface/DataInterface";

interface UseContributorApiReturn {
  contributors: Contributor[];
  loading: boolean;
  error: string | null;
  fetchContributors: () => Promise<void>;
  addContributor: (contributor: Omit<Contributor, "id">) => Promise<void>;
  updateContributor: (email: string, updatedContributor: Omit<Contributor, "email">) => Promise<void>;
  deleteContributor: (email: string) => Promise<void>;
}

export default function useContributorApi(API_URL: string): UseContributorApiReturn {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    if (err instanceof Error) setError(err.message);
    else setError(String(err));
  };

  const fetchContributors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}contributors`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data: Contributor[] = await res.json();
      setContributors(data);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const addContributor = async (contributor: Omit<Contributor, "email">) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}contributors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contributor),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const newContributor: Contributor = await res.json();
      setContributors((prev) => [...prev, newContributor]);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

    const updateContributor = async (email: string, updatedContributor: Omit<Contributor, "email">) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}contributors/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContributor),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Contributor = await res.json();
        setContributors(prev => prev.map(c => (c.email === email ? data : c)));
    } catch (err: unknown) {
        handleError(err);
    } finally {
        setLoading(false);
    }
    };

    const deleteContributor = async (email: string) => {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}contributors/${email}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        setContributors(prev => prev.filter(c => c.email !== email));
    } catch (err: unknown) {
        handleError(err);
    } finally {
        setLoading(false);
    }
    };


  useEffect(() => {
    fetchContributors();
  }, []);

  return {
    contributors,
    loading,
    error,
    fetchContributors,
    addContributor,
    updateContributor,
    deleteContributor,
  };
}
