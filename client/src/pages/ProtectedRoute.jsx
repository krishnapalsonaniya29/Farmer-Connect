import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
