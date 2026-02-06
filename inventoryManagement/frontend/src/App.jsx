import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";

import Login from "./pages/Login";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => (
  <AuthProvider>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <Products />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <ProtectedLayout>
                  <Orders />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <ProtectedLayout>
                  <AdminDashboard />
                </ProtectedLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </AuthProvider>
);

export default App;
