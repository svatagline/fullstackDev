import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: 220 }}>
      <h5 className="mb-4">Inventory App</h5>

      <ul className="nav flex-column gap-2">
        <li>
          <NavLink className="nav-link text-white" to="/">
            Products
          </NavLink>
        </li>

        {user?.role === "user" && (
          <li>
            <NavLink className="nav-link text-white" to="/orders">
              My Orders
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
