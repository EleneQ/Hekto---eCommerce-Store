import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import OrderDetailsPage from "./pages/OrderDetails/OrderDetailsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrderListPage from "./pages/AdminPages/OrderList/OrderListPage";
import ProductListPage from "./pages/AdminPages/ProductList/ProductListPage";
import ProductEditPage from "./pages/AdminPages/ProductEdit/ProductEditPage";
import UserListPage from "./pages/AdminPages/UserList/UserListPage";
import ProductsPage from "./pages/Products/ProductsPage";
import CancelPage from "./pages/Cancel/CancelPage";

//allows child routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:searchParams" element={<ProductsPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/productlist" element={<ProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="/admin/userlist" element={<UserListPage />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
