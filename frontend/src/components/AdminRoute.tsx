import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return userInfo?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
