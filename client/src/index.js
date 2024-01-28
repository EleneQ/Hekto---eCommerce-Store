import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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
import ShippingPage from "./pages/shipping/ShippingPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrder/PlaceOrderPage";
import OrderDetailsPage from "./pages/Order/OrderDetailsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import OrderListPage from "./pages/AdminPages/OrderList/OrderListPage";
import ProductList from "./pages/AdminPages/ProductList/ProductList";
import ProductEditPage from "./pages/AdminPages/ProductEdit/ProductEditPage";
import UserListPage from "./pages/AdminPages/UserList/UserListPage";

//allows child routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      {/* <Route path="/search/:keyword" element={<HomePage />} />
      <Route path="/page/:pageNumber" element={<HomePage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} /> */}
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListPage />} />
        <Route path="/admin/productlist" element={<ProductList />} />
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
