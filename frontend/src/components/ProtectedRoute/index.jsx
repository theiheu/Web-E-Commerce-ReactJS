import { useSelector } from "react-redux";
import NotPermitted from "../NotPermitted";

const RoleBaseRoute = (Props) => {
  const isRole = useSelector((state) => state?.account?.user?.role);

  return isRole == "ADMIN" ? <>{Props.children}</> : <NotPermitted />;
};

const ProtectedRoute = (Props) => {
  const isAuthenticated = useSelector(
    (state) => state?.account?.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{Props.children}</RoleBaseRoute>
      ) : (
        <NotPermitted />
      )}
    </>
  );
};

export default ProtectedRoute;
