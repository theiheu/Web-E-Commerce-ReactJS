import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/accountSlice";
import { Button } from "antd";
import instance from "./utils/axios-customize";

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.account);

  const handleRefreshToken = async () => {
    const res = await instance.get("/api/v1/auth/refresh");
    console.log("Line: 12 - Here", res);
    // if (res && res.data) res.data.access_token;
    // else null;
  };

  const getAccount = async () => {
    try {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/login"
      )
        return;

      const res = await fetchAccount();
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

      <Button>
        <a href="http://localhost:5173/login">Test admin</a>
      </Button>

      <Button
        onClick={async () =>
          console.log("Line: 44 - Here", await handleRefreshToken())
        }
      >
        isAuthenticated
      </Button>
    </>
  );
}
