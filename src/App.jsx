import { useDispatch, useSelector } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchAccount } from "./services/api";
import { useEffect } from "react";
import { doGetAccountAction } from "./redux/accountSlice";
import Loading from "./components/Loading/Loading";

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.account);
  // const user = useSelector((state) => state?.account);

  const getAccount = async () => {
    const res = await fetchAccount();
    dispatch(doGetAccountAction(res?.data?.data?.user));
  };

  useEffect(() => {
    getAccount();
  }, []);

  return <>{isLoading ? <Loading /> : <RouterProvider router={Routers} />}</>;
}
