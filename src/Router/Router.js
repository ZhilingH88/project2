import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  ProductForm,
  ShowProducts,
  ProductDetail,
  CartContainer,
} from "../component";
import Register from "../page/Register/Register";
import { useLocation } from "react-router-dom";
import { MyLayout, ServerFailed } from "../common";
import { ToastContainer } from "react-toastify";
import RequireAdmin from "../page/RequireAdmin";

const Router = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  console.log("rount", background);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MyLayout />}>
          <Route index element={<ShowProducts />} />
          <Route
            key="login"
            path="login"
            element={<Register background={background} />}
          />
          <Route
            key="signup"
            path="signup"
            element={<Register background={background} />}
          />
          <Route
            key="shopping-cart"
            path="/cart"
            element={<CartContainer background={background} />}
          />
          <Route
            key="update-password"
            path="/update_password"
            element={<Register background={background} />}
          />

          <Route element={<RequireAdmin />}>
            <Route
              key="create-product"
              path="/create-product"
              element={<ProductForm />}
            />
            <Route
              key="edit-product"
              path="/edit-product/:productId"
              element={<ProductForm />}
            />
          </Route>

          <Route
            key="product-detail"
            path="/product-detail/:productId"
            element={<ProductDetail />}
          />
          <Route
            path="/403"
            element={
              <ServerFailed
                status={"403"}
                title={"403"}
                subTitle={"Sorry, your are not authorized to access this page"}
              />
            }
          />
          <Route
            path="*"
            element={
              <ServerFailed
                status={"404"}
                title={"404"}
                subTitle={"Sorry, the page you visited doesn't exist"}
              />
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            key="login"
            path="/login"
            element={<Register background={background} />}
          />
          <Route
            key="signup"
            path="/signup"
            element={<Register background={background} />}
          />
          <Route
            key="update-password"
            path="/update_password"
            element={<Register background={background} />}
          />
          <Route
            key="shopping-cart"
            path="/cart"
            element={<CartContainer background={background} />}
          />
        </Routes>
      )}
      <ToastContainer position="top-center" />
    </>
  );
};

export default Router;
