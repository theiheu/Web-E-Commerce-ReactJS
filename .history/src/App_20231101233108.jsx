import { useDispatch } from "react-redux";
import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";
import { fetchlUser } from "./services/api";

export default function App() {
  const dispatch = useDispatch();
  fetchlUser(localStorage.getItem("access_token"));

  return <RouterProvider router={Routers} />;
}
