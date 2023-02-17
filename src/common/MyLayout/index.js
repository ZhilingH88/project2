import { Layout } from "antd";
import React, { useEffect } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./index.css";
import { Outlet } from "react-router-dom";
import { calculateTotals, setCartItem } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useGetCartQuery } from "../../features/cart/cartApiSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const { Content } = Layout;
const MyLayout = () => {
  // const dispatch = useDispatch();
  // const token = getUserFromLocalStorage("token");
  // const { data, isLoading, error } = useGetCartQuery(undefined, {
  //   skip: token == null,
  // });
  // const cartItems = data?.cartItems;
  // useEffect(() => {
  //   if (cartItems && token) {
  //     dispatch(setCartItem(cartItems));
  //     dispatch(calculateTotals());
  //   }
  // }, [cartItems, token]);

  return (
    <Layout>
      <MyHeader />
      <div className="flex-wrapper">
        <Content className="content">
          <Outlet />
        </Content>
        <MyFooter />
      </div>
    </Layout>
  );
};

export default MyLayout;
