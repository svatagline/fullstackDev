// hooks/useApi.js
import axios from "axios";
import { useState, useCallback, useMemo } from "react";

// axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async ({ method, url, data, config }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url,
        data,
        ...config,
      });

      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔥 Generate methods dynamically
  const methods = useMemo(() => {
    const createMethod =
      (method) =>
        (url, data = null, config = {}) =>
          request({ method, url, data, config });

    return {
      get: createMethod("get"),
      post: createMethod("post"),
      put: createMethod("put"),
      delete: createMethod("delete"),
    };
  }, [request]);

  return {
    loading,
    error,
    ...methods,
  };
};
