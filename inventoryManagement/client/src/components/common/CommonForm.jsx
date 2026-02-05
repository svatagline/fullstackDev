import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CommonForm = ({ onHandleSubmit, initialValues = {}, formData = [] }) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      onHandleSubmit(values);
    },
    validationSchema: Yup.object({
      ...formData.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {}),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formData.map((field) => {
        return ["text", "email", "password", "number", "textarea"].includes(
          field.type,
        ) ? (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />{" "}
            {formik.touched[field.name] && formik.errors[field.name] ? (
              <div style={{ color: "red" }}>{formik.errors[field.name]}</div>
            ) : null}
          </div>
        ) : null;
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommonForm;
