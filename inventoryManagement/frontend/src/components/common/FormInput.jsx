const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  name,
}) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}

      {type === "textarea" ? (
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          name={name}
        />
      ) : (
        <input
          className={`form-control ${error ? "is-invalid" : ""}`}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          name={name}
        />
      )}

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormInput;
