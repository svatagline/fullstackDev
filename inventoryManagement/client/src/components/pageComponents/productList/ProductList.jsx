import React, { useEffect } from "react";
import CommonTable from "../../common/CommonTable";
import useAxios from "../../../customeHook/useAxios";

const ProductList = () => {
  const {
    getResponse,
    data: { response, error = null, loading = true },
  } = useAxios({
    url: "/products",
    method: "get",
  });

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error?.message}</p>
      ) : (
        <CommonTable data={response.data} status={response.status} />
      )}
    </div>
  );
};

export default ProductList;
