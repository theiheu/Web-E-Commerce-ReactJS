import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfoundpage";

const Layout = () => {
  return <div>Hello world!</div>;
};

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
  },
]);

export default Routers;
