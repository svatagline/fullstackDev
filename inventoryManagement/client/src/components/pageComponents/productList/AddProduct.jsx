import React from "react";
import CommonModel from "../../common/CommonModel";
import CommonForm from "../../common/CommonForm";
import * as Yup from "yup";
import useAxios from "../../../customHook/useAxios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/slices/productSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const {
    getResponse,
    data: { response, error = null, loading = true },
  } = useAxios({
    url: "/products",
    method: "post",
  });

  const formData = [
    {
      label: "Product Name",
      name: "name",
      type: "text",
      validation: Yup.string().required("Required"),
    },
    { label: "Product Description", name: "description", type: "textarea" },
    {
      label: "Product Price",
      name: "price",
      type: "number",
      validation: Yup.number().required("Required"),
    },
    {
      label: "Product Quantity",
      name: "stock",
      type: "number",
      validation: Yup.number().required("Required"),
    },
  ];

  const initialValues = {
    name: "",
    description: "",
    price: "",
    stock: "",
  };

  const onHandleSubmit = (values) => {
    console.log("Submitted values:", values);
    getResponse({
      body: JSON.stringify(values),
      onSuccess: (data) => {
        dispatch(addProduct(data.data));
      },
    });
  };

  return (
    <CommonForm
      onHandleSubmit={onHandleSubmit}
      initialValues={initialValues}
      formData={formData}
    />
  );
};

const AddProduct = () => {
  return (
    <div>
      <CommonModel title="Add Product" content={<AddProductForm />} />
    </div>
  );
};

export default AddProduct;
