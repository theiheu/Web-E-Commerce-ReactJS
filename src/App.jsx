import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchlUser } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/accountSlice";
import { Button } from "antd";
import ProtectedRoute from "../.history/src/components/ProtectedRoute/index_20231102172001";

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state?.account?.isAuthenticated
  );

  const getAccount = async () => {
    console.log("Line: 17 - Here");
    try {
      if (window.location.pathname === "/login" && isAuthenticated) {
        window.location.pathname = "/";
      }
      const res = await fetchlUser();
      dispatch(doGetAccountAction(res?.data?.data?.user));
    } catch (error) {
      console.log(`error:`, error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <RouterProvider router={Routers} />
      <Button
        onClick={() => {
          console.log("Line: 37 - Here", isAuthenticated);
        }}
      >
        Test
      </Button>
    </>
  );
}
