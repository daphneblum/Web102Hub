import { useState, useEffect } from "react";

function useConflictEvents(filters = {}) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filterKey = JSON.stringify(filters);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams(filters).toString();

            try {
                const res = await fetch(`/api/conflict-events?${params}`);
                if (!res.ok) {
                    const errBody = await res.json().catch(() => ({}));
                    throw new Error(errBody.error || `Request failed (${res.status})`);
                }
                const data = await res.json();
                if (cancelled) return;

                setEvents(data.data || []);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [filterKey]);

    return { events, loading, error };
}

export default useConflictEvents;