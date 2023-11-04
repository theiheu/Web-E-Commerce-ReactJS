import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchlUser } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/accountSlice";
import { Button } from "antd";
import Loading from "./components/Loading/Loading";

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state?.account?.isAuthenticated
  );

  const getAccount = async () => {
    try {
      // console.log("Line: 18 - Here", isAuthenticated);
      // if (
      //   window.location.pathname === "/login" ||
      //   window.location.pathname === "/register"
      // ) {
      //   return window.location.assign("/");
      // }
      const res = await fetchlUser();
      dispatch(doGetAccountAction(res?.data?.data?.user));
    } catch (error) {
      // console.log(`error:`, error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      {isAuthenticated ? <RouterProvider router={Routers} /> : <Loading />}
      {/* <RouterProvider router={Routers} /> */}
      <Button>
        <a href="http://localhost:5173/login">Test admin</a>
      </Button>

      <Button onClick={() => console.log("Line: 44 - Here", isAuthenticated)}>
        isAuthenticated
      </Button>
    </>
  );
}
