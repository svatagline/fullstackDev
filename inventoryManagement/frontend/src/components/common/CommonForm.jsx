import React from "react";

const CommonForm = ({ formData, onChange }) => {
  return formData.map((field, index) => (
    <div className="flex flex-col space-y-1" key={index}>
      <label
        htmlFor={field.name}
        className="text-sm font-semibold text-gray-500"
      >
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        id={field.name}
        value={field.value}
        onChange={onChange}
        className="px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder={field.placeholder}
      />
    </div>
  ));
};

export default CommonForm;
