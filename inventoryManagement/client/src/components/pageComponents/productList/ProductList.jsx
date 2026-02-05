import React, { useEffect } from "react";
import CommonTable from "../../common/CommonTable";
import useAxios from "../../../customHook/useAxios";
import AddProduct from "./AddProduct";
import { setProductList } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const {
    getResponse,
    data: { response, error = null, loading = true },
  } = useAxios({
    url: "/products",
    method: "get",
  });

  useEffect(() => {
    getResponse({});
  }, []);

  useEffect(() => {
    console.log("hhhh", { response });
    if (response?.status === "success") {
      dispatch(setProductList(response.data));
    }
  }, [response]);

  const columns = [
    { name: "ID", selector: (row, index) => index + 1 },
    { name: "Name", selector: (row) => row.name },
    { name: "Price", selector: (row) => row.price },
    { name: "Quantity", selector: (row) => row.stock },
    { name: "Description", selector: (row) => row.description },
  ];
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error?.message}</p>
      ) : (
        <div className="productListContent">
          <div className="header">
            <h1>Product List</h1>
            <div>
              <AddProduct />
            </div>
          </div>
          <CommonTable
            columns={columns}
            list={productList}
            status={response.status}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
