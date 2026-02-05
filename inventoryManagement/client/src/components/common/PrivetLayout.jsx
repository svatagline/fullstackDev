import React from "react";
import BNavbar from "./Navbar";

const PrivetLayout = ({ children }) => {
  return (
    <div className="privet-layout">
      <BNavbar />
      {children}
    </div>
  );
};

export default PrivetLayout;
