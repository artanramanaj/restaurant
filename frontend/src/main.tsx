import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n/index";
import {
  HomeScreen,
  AboutScreen,
  RegisterScreen,
  LoginScreen,
  ForgetPasswordScreen,
  VerifyScreen,
  DashboardScreen,
  DashboardProductsScreen,
  CreateProductScreen,
  EditProductScreen,
  DashboardCategoriesScreen,
  CreateCategoryScreen,
  EditCategoryScreen,
  DashboardUsersScreen,
  DashboardOrderScreen,
  CheckoutScreen,
  DashboardOrderDetailsScreen,
  ProfileScreen,
} from "@/screens/index.ts";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PrivateRoute, AdminRoute } from "@/components";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/verify" element={<VerifyScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/forget-password" element={<ForgetPasswordScreen />} />
      <Route path="/checkout" element={<CheckoutScreen />} />
      {/* private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index={true} element={<DashboardScreen />} />
        <Route path="/admin/products" element={<DashboardProductsScreen />} />
        <Route
          path="/admin/products/create"
          element={<CreateProductScreen />}
        />
        <Route
          path="/admin/products/edit/:id"
          element={<EditProductScreen />}
        />
        <Route
          path="/admin/categories"
          element={<DashboardCategoriesScreen />}
        />
        <Route
          path="/admin/categories/create"
          element={<CreateCategoryScreen />}
        />
        <Route
          path="/admin/categories/edit/:id"
          element={<EditCategoryScreen />}
        />
        <Route path="/admin/users" element={<DashboardUsersScreen />} />
        <Route path="/admin/orders" element={<DashboardOrderScreen />} />
        <Route
          path="/admin/orders/:id"
          element={<DashboardOrderDetailsScreen />}
        />
      </Route>
    </Route>,
  ),
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" pauseOnHover />
    </Provider>
  </StrictMode>,
);
