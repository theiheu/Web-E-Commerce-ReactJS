import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import AdminPage from "../pages/Admin";
import UserTable from "../pages/Admin/User/UserTable";
import BooksTable from "../pages/Admin/Books/BooksTable";
import BookPage from "../pages/BookPage";
import Order from "../pages/Order/index";
import OrderHistory from "../pages/OrderHistory";
import OrderTable from "../pages/Admin/Order";
import DashBoard from "../pages/Admin/DashBoard";
import { useState } from "react";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header setOpenDrawer={setOpen} />
      <div className="h-[72px]"></div>
      <Outlet context={[open, setOpen]} />
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
        path: "/orderhistory",
        element: <OrderHistory />,
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
        path: "/admin/dash-board",
        element: <DashBoard />,
      },
      {
        path: "/admin/user",
        element: <UserTable />,
      },
      {
        path: "/admin/books",
        element: <BooksTable />,
      },
      {
        path: "/admin/order",
        element: <OrderTable />,
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
