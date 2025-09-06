import { useEffect, useState } from "react";
import api from "../services/api";

export function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;

    async function loadData() {
      try {
        const response = await api.get(endpoint);
        if (!cancel) setData(response.data);
      } catch (err) {
        if (!cancel) setError(err);
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    loadData();

    return () => {
      cancel = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}