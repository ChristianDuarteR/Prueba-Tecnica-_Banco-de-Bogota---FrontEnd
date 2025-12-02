import { useState, useEffect } from "react";

export default function useContributorApi(API_URL) {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchContributors = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}contributors`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setContributors(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const fetchcontributorById = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}contributors/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setContributors(prev => [...prev, data]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const addContributor = async (contributor) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}contributors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contributor),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const newContributor = await res.json();
            setContributors(prev => [...prev, newContributor]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const updateContributor = async (id, updatedContributor) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}contributors/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedContributor),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            setContributors(prev => prev.map(c => (c.id === id ? data : c)));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const deleteContributor = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}contributors/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            setContributors(prev => prev.filter(c => c.id !== id));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

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
        deleteContributor
    };
}
