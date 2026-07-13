import { useState, useEffect } from 'react';

export function useForecast() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchForecast() {
      try {
        setLoading(true);
        const response = await fetch('/api/forecast');

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

    fetchForecast();

    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}