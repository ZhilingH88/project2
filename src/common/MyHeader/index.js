import React from "react";
import { Layout } from "antd";
import { HeaderContent } from "../../component";
import "./index.css";

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header className="header">
      <HeaderContent />
    </Header>
  );
};

export default MyHeader;
