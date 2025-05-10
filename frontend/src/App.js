import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/common/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CustomerRegister from "./components/auth/CustomerRegister";
import AdminRegister from "./components/auth/AdminRegister";
import AdminLogin from "./components/auth/AdminLogin";
import VerifyEmail from "./components/auth/VerifyEmail";
import EmailVerified from "./pages/EmailVerified";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {" "}
            {/* Layout wraps all child routes */}
            <Route path="/" element={<Home />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register/customer" element={<CustomerRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
