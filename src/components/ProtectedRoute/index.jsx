import { useSelector } from "react-redux";
import NotPermitted from "../NotPermitted";

const RoleBaseRoute = (props) => {
  const isRole = useSelector((state) => state?.account?.user?.role);
  console.log(`isRole:`, isRole);

  return isRole == "ADMIN" && window.location.pathname === "/admin" ? (
    <>{props.children}</>
  ) : (
    <NotPermitted />
  );
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector(
    (state) => state?.account?.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{props.children}</RoleBaseRoute>
      ) : (
        <NotPermitted />
      )}
    </>
  );
};

export default ProtectedRoute;
