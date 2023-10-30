import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/notfoundpage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "../pages/login/index";
import Home from "../pages/home";
import RegisterPage from "../pages/register";

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
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default Routers;
