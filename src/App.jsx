import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/accountSlice";
import { Button } from "antd";
import Loading from "./components/Loading/Loading";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state?.account
  );

  const getAccount = async () => {
    try {
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

      <Button onClick={() => console.log("Line: 44 - Here", isLoading)}>
        isAuthenticated
      </Button>
    </>
  );
}
