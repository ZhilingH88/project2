import { Layout } from "antd";
import React, { useEffect } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./index.css";
import { Outlet } from "react-router-dom";
import { calculateTotals, setCartItem } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../../features/cart/cartApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";

const { Content } = Layout;
const MyLayout = () => {
  const { data, isLoading, isFetching, error } = useGetCartQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    if (data) {
      dispatch(setCartItem(data.cartItems));
      dispatch(calculateTotals());
    }
  }, [data, token]);
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
