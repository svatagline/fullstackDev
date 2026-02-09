import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      <span className="navbar-brand">Dashboard</span>

      <div className="d-flex align-items-center gap-3">
        <span className="text-muted">
          {user?.name} <strong>{user?.role}</strong>
        </span>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
