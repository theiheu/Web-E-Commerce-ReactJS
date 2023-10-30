import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfoundpage";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <NotFoundPage />,
  },
]);

// const Layout = () => {
//   <div>Hello world!</div>;
// };

export default Routers;
