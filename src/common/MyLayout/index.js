import { Layout } from "antd";
import React from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import "./index.css";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
const MyLayout = () => {
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
