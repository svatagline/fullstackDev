import { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
const useAxios = ({ url, method, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResponse = ({ body = "{}", onSuccess = () => {} }) => {
    console.log({ body: JSON.parse(body) });
    axios[method](url, JSON.parse(body), JSON.parse(headers))
      .then((res) => {
        onSuccess(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { getResponse, data: { response, error, loading } };
};

export default useAxios;
