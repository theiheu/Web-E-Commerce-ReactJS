import { useSelector } from "react-redux";
import NotPermitted from "../NotPermitted";

const RoleBaseRoute = (props) => {
  const isRole = useSelector((state) => state?.account?.user?.role);

  return isRole == "ADMIN" ? <>{props.children}</> : <NotPermitted />;
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
