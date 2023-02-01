import React from "react";
import { Layout } from "antd";
import { HeaderContent } from "../../component";

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header>
      <HeaderContent />
    </Header>
  );
};

export default MyHeader;
