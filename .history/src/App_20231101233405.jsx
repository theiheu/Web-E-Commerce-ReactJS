import { useDispatch } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { callUser, fetchlUser } from "./services/api";

export default function App() {
  const dispatch = useDispatch();

  const getAccount = async () => {
    const res = await callUser();
    console.log(`res:`, res);
  };

  // fetchlUser();

  return <RouterProvider router={Routers} />;
}
