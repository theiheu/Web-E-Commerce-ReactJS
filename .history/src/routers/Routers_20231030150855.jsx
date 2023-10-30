import { createBrowserRouter } from "react-router-dom";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);

const Layout = () => {
  <div>Hello world!</div>;
};

export default Routers;
