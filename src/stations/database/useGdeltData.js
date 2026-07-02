import { useState, useEffect } from "react";
//api call to GDELT API to get recent conflict data

function useGdeltData(query) {
    const [articles, setArticles] = useState([]);
    const[points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            const safeQuery = query?.trim() || "armed conflict";

            const docUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(safeQuery)}` +
                            `&mode=artlist&maxrecords=75&format=json&sort=hybridrel&timespan=3d`;

            const geoUrl = `https://api.gdeltproject.org/api/v2/geo/geo?query=${encodeURIComponent(safeQuery)}` +
                            `&format=geojson&timespan=3d`;

            try {
                const [docRes, geoRes] = await Promise.all([
                    fetch(docUrl),
                    fetch(geoUrl)
                ]);

                if (!docRes.ok || !geoRes.ok) {
                    throw new Error("Failed to fetch data from GDELT API");
                }

                const docData = await docRes.json();
                const geoData = await geoRes.json();

                if (cancelled) return;

                setArticles(docData?.articles || []);
                setPoints(geoData?.features || []);
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
    }, [query]);

    return { articles, points, loading, error };
}

export default useGdeltData;