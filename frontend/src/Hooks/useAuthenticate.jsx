import { Navigate, Outlet } from "react-router-dom";

const UserProtected = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default UserProtected;
