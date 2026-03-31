import { useResponseDB } from "./useResponseDB.js";
import { useCallback } from "react";

const URL_BACKEND = "http://localhost:3000/";

export const useRequestDB = () => {
  const { setResponseDB, loading, setLoading, setError } = useResponseDB();

  const requestDB = useCallback(async (url, method, body) => {
    try {
      setLoading(true);
      setError(null);

      const isFormData = body instanceof FormData

      const responseDb = await fetch(`${URL_BACKEND}${url}`, {
        method: method,
        headers: isFormData ? undefined : { "Content-Type": "application/json" },
        credentials: 'include',
        body: method !== 'GET' ? (isFormData ? body : JSON.stringify(body)) : undefined,
      });

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