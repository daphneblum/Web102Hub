import { useState, useEffect } from 'react';

export function useRetrogradeTimeline() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchTimeline() {
            try {
                setLoading(true);
                const response = await fetch('/api/retrograde-timeline');

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const json = await response.json();

                if (!cancelled) {
                    setData(json);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchTimeline();

        return () => { cancelled = true; };
    }, []);
    return { data, loading, error };
}