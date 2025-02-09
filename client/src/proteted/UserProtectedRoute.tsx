import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserProtectedRoute;
