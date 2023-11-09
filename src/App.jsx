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
  const { isLoading, isAuthenticated } = useSelector((state) => state?.account);
  // const user = useSelector((state) => state?.account);

  const getAccount = async () => {
    const res = await fetchAccount();
    console.log(`res:`, res);
    dispatch(doGetAccountAction(res?.data?.data?.user));
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : <RouterProvider router={Routers} />}
      {/* <RouterProvider router={Routers} /> */}
      <Button>
        <a href="http://localhost:5173/admin">Test admin</a>
      </Button>

      <Button
        onClick={async () => console.log("Line: 44 - Here", isAuthenticated)}
      >
        isAuthenticated
      </Button>
    </>
  );
}
