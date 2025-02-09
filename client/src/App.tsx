import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/user/UserLogin";
import AdminLogin from "./components/admin/AdminLogin";
import UserProtectedRoute from "./proteted/UserProtectedRoute";
import AdminProtectedRoute from "./proteted/AdminProtectedRoute";
import UserSignup from "./components/user/UserSignup";
import { Toaster } from "sonner";
import ClientDashboard from "./components/user/ClientDashboard";

function App() {
  return <AppLayout />;
}

export default App;

const AppLayout = () => {
  return (
    <Router>
      <Toaster position="bottom-right" richColors />
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user/dashboard" element={<ClientDashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};
