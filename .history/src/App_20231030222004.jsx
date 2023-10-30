import Routers from "./routers/Routers";
import { RouterProvider } from "react-router-dom";

export default function App() {
  return <RouterProvider router={Routers} />;
}
