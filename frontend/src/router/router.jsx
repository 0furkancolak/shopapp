import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/404/404";
import Home from "../pages/home/Home";
import Basket from "../pages/basket/Basket";
import Admin from "../pages/admin/Admin";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import User from "../components/admin/User";
import ProductList from "../components/admin/ProductList";
import ProductEdit from "../components/admin/ProductEdit";
import CreateProduct from "../components/admin/CreateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sepet",
        element: <Basket />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <ProductList />,
          },
          {
            path: "product-edit/:id",
            element: <ProductEdit />,
          },
          {
            path: "product-create",
            element: <CreateProduct />,
          },
          {
            path: "users",
            element: <User />,
          },
        ],
      },
    ],
  },
]);
