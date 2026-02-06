import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
