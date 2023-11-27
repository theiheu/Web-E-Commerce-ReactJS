import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import { Footer } from "antd/es/layout/layout";
import AdminPage from "../pages/Admin";
import UserTable from "../pages/Admin/User/UserTable";
import BooksTable from "../pages/Admin/Books/BooksTable";
import BookPage from "../pages/BookPage";
import Order from "../pages/Order/index";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="h-[72px]"></div>
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
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/book/:slug",
        element: <BookPage />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/admin/user",
        element: <UserTable />,
      },
      {
        path: "/admin/books",
        element: <BooksTable />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

export default Routers;
