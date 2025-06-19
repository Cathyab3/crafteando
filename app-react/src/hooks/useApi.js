import { useState, useEffect, useCallback } from 'react';


export const useApi = (apiCall, dependencies = []) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);


   const fetchData = useCallback(async () => {
       try {
           setLoading(true);
           setError(null);
           const response = await apiCall();
           setData(response.data);
       } catch (err) {
           setError(err.message || 'Error al cargar los datos');
       } finally {
           setLoading(false);
       }
   }, dependencies);


   useEffect(() => {
       fetchData();
   }, [fetchData]);


   const refetch = () => {
       fetchData();
   };


   return { data, loading, error, refetch: fetchData };
};

