import { useResponseDB } from "./useResponseDB.js";
import { useCallback } from "react";

const URL_BACKEND = "http://localhost:3000/";

export const useRequestDB = () => {
  const { setResponseDB, loading, setLoading, setError } = useResponseDB();

  const requestDB = useCallback(async (url, method, body) => {
    try {
      setLoading(true);
      setError(null);
      const responseDb = await fetch(`${URL_BACKEND}${url}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
      });
      console.log(responseDb)


      if (!responseDb.ok) {
        throw new Error(`HTTP error! status: ${responseDb.status}`);
      }

      const data = await responseDb.json();
      setResponseDB(data);
      return data;
    } catch (error) {
      // Aqui este error lo debemos mandar a un recurso para que guarde el log.
      setError("Error al hacer petición al backend: " + error.message)
      return {
        ok: false,
        message: "Error al hacer petición al backend: " + error.message
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { requestDB, loading };
};