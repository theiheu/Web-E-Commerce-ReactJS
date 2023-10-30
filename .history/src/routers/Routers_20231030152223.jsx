import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfoundpage";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
  },
]);

const Layout = () => {
  return <div>Hello world!</div>;
};

export default Routers;
