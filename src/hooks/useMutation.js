import { useState, useCallback } from "react";

export const useMutation = (mutationFn) => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const mutate = useCallback(
    async (payload) => {
      try {
        setLoading(true);
        setError(null);
        await mutationFn(payload);           
      } catch (err) {
        setError(err.message || "Error al guardar");
        throw err;                          
      } finally {
        setLoading(false);
      }
    },
    [mutationFn]
  );

  return { mutate, loading, error };
};