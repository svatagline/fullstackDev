"use client";
import CommonForm from "@/components/common/CommonForm";
import reactHook from "@/hook/reactHook";
import { users } from "@/utils/fackDb";
import React, { useState } from "react";

const LoginComponent = () => {
  const { navigate, setCookie, removeCookie, setStorage } = reactHook();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    console.log(formData);

    const authorizedUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );
    console.log({ authorizedUser });
    if (authorizedUser) {
      setCookie("isLoggedIn", "true");
      setStorage("user", JSON.stringify(authorizedUser));
      navigate("/dashboard");
    } else {
      removeCookie("isLoggedIn");
      alert("Invalid Credentials");
    }
  };

  const formFieldsData = (value) => [
    {
      label: "Email address",
      type: "email",
      name: "email",
      id: "email",
      value: value.email,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      value: value.password,
    },
  ];
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">K-WD</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for
            your digital products, while leaving the UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <a href="#" className="underline">
              Get Started!
            </a>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our{" "}
            <a href="#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <div action="#" className="flex flex-col space-y-5">
            <CommonForm
              formData={formFieldsData(formData)}
              onChange={handleChange}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label>
            </div>
            <div>
              <button
                onClick={onSubmit}
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
