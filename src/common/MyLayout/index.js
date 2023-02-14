import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./index.css";
import { Outlet } from "react-router-dom";
import { calculateTotals, setCartItem } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../../features/cart/cartApiSlice";
import {
  selectCurrentToken,
  setCredentials,
  setUserLogin,
} from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import { apiSlice } from "../../app/api/apiSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const { Content } = Layout;
const MyLayout = () => {
  const dispatch = useDispatch();
  const token = getUserFromLocalStorage("token");
  const { data, isLoading, error } = useGetCartQuery(undefined, {
    skip: token == null,
  });
  const cartItems = data?.cartItems;
  useEffect(() => {
    if (cartItems && token) {
      dispatch(setCartItem(cartItems));
      dispatch(calculateTotals());
    }
  }, [cartItems, token]);

  return (
    <Layout>
      <MyHeader />
      <Content className="content" style={{ height: "100%" }}>
        <Outlet />
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default MyLayout;
