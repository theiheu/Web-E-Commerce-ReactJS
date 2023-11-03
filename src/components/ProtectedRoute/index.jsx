import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state) => state?.account?.isAuthenticated
  );
  return (
    <>
      {isAuthenticated || window.location.pathname === "/login" ? (
        <Navigate to={"/"} replace />
      ) : (
        <>props.children</>
      )}
    </>
  );
};

export default ProtectedRoute;
