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
                const normalizedEvents = (data.data || []).map(item => ({
                // GDELT often uses 'sourceurl' or 'url' for links
                url: item.sourceurl || item.url || null, 
                
                // GDELT properties might use 'action_text', 'headline', or 'event_type'
                // Log your raw item to console if you need to double check their keys!
                title: item.headline || item.story_title || "Global Conflict Event",
                country: item.country_name || item.country || "Global",
                date: item.date_added || item.date || new Date().toISOString().slice(0,10),
                category: item.category || filters.category || "General"
            }));

            setEvents(normalizedEvents);

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