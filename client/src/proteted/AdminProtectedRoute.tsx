import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AdminProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.admin.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
