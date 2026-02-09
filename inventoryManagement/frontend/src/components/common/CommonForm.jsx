import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";

const validateForm = (values, config) => {
  const errors = {};

  config.forEach((field) => {
    const value = values[field.fieldName];
    if (!field.validation) return;

    for (let ruleObj of field.validation) {
      const { ruleType, rule, errorMessage } = ruleObj;

      let isValid = true;

      if (ruleType === "regex") {
        isValid = rule.test(value || "");
      }

      if (ruleType === "function") {
        isValid = rule(value);
      }

      if (!isValid) {
        errors[field.fieldName] = errorMessage;
        break; // stop on first error
      }
    }
  });

  return errors;
};

const CommonForm = forwardRef(
  ({ config, onSubmit, formData, setFormData }, ref) => {
    // Build initial values dynamically
    const initialValues = { ...formData };
    config.forEach((field) => {
      if (field.type === "checkbox") {
        initialValues[field.fieldName] = false;
      } else {
        initialValues[field.fieldName] = "";
      }
    });

    const formik = useFormik({
      initialValues,
      validate: (values) => validateForm(values, config),
      onSubmit: () => onSubmit(formik.values),
    });

    const renderField = (field) => {
      const { fieldName, type, label } = field;
      const error = formik.errors[fieldName];
      const touched = formik.touched[fieldName];

      switch (type) {
        case "textarea":
        case "number":
        case "email":
        case "password":
        case "text":
          return (
            <div className="mb-3" key={fieldName}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                className={`form-control ${error && touched ? "is-invalid" : ""}`}
                {...formik.getFieldProps(fieldName)}
                placeholder={field.placeholder}
              />
              {error && touched && (
                <div className="invalid-feedback">{error}</div>
              )}
            </div>
          );

        case "checkbox":
          return (
            <div className="form-check mb-3" key={fieldName}>
              <input
                type="checkbox"
                className={`form-check-input ${error && touched ? "is-invalid" : ""}`}
                checked={formik.values[fieldName]}
                onChange={() =>
                  formik.setFieldValue(fieldName, !formik.values[fieldName])
                }
                onBlur={formik.handleBlur}
              />
              <label className="form-check-label">{label}</label>
              {error && touched && <div className="text-danger">{error}</div>}
            </div>
          );

        case "radio":
          return (
            <div className="mb-3" key={fieldName}>
              <label className="form-label d-block">{label}</label>
              {field.options.map((opt) => (
                <div className="form-check form-check-inline" key={opt.value}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name={fieldName}
                    value={opt.value}
                    checked={formik.values[fieldName] === opt.value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label">{opt.label}</label>
                </div>
              ))}
              {error && touched && <div className="text-danger">{error}</div>}
            </div>
          );

        default:
          return null;
      }
    };

    useImperativeHandle(ref, () => ({
      setFieldValue: formik.setFieldValue,
      resetForm: formik.resetForm,
      submitForm: formik.handleSubmit,
    }));

    useEffect(() => {
      // Update form values when formData changes (e.g., when editing)
      formik.setValues((prev) => ({ ...prev, ...formData }));
    }, [formData]);
    return (
      <form onSubmit={formik.handleSubmit}>
        {config.map(renderField)}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  },
);

export default CommonForm;
