import { useDispatch } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { callUser, fetchlUser } from "./services/api";
import { useEffect } from "react";

export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await fetchlUser();
    console.log(`res:`, res);
  };

  useEffect(() => {
    getAccount();
  }, []);

  // fetchlUser();

  return <RouterProvider router={Routers} />;
}
