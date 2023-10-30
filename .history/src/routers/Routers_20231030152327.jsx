import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfoundpage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
  },
]);

export default Routers;
