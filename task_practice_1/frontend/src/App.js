import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import OrderPage from './pages/orderPages/OrderPage';
import ProductPage from './pages/productPage/ProductPage';
import LoginPage from './pages/authPages/LoginPage';
import { ProtectedLayout, PublicLayout } from './components/Layouts';
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Login</Link> |{" "}
          <Link to="/products">Product Page</Link> |{" "}
          <Link to="/orders">Order Page</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/products" element={<ProtectedLayout><ProductPage /></ProtectedLayout>} />
          <Route path="/orders" element={<ProtectedLayout><OrderPage /></ProtectedLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App