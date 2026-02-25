import axios from "axios";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

// Axios instance remains the same
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// The fetcher function for SWR
const fetcher = (url) => api.get(url).then((res) => res.data);

export const useApi = (url = null, config = {}) => {
  // 1. Initialize SWR
  // We only activate SWR if a 'url' is provided to the hook
  const {
    data,
    error: swrError,
    isValidating,
    mutate
  } = useSWR(url, fetcher, {
    refreshInterval: 60000, // 1 minute revalidation
    revalidateOnFocus: true,
    ...config,
  });

  // 2. Existing request logic for POST/PUT/DELETE
  const request = useCallback(async ({ method, url, data, config }) => {
    try {
      const response = await api({ method, url, data, ...config });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      throw message;
    }
  }, []);

  const methods = useMemo(() => {
    const createMethod = (method) => (url, data = null, config = {}) =>
      request({ method, url, data, config });

    return {
      get: createMethod("get"),
      post: createMethod("post"),
      put: createMethod("put"),
      delete: createMethod("delete"),
    };
  }, [request]);

  // 3. Maintain backward compatibility for 'loading' and 'error'
  return {
    data, // New: provides the cached data
    loading: !data && !swrError, // Compatibility: true only on first load
    isValidating, // New: true whenever re-fetching in background
    error: swrError || null,
    mutate, // New: manual revalidation
    ...methods,
  };
};