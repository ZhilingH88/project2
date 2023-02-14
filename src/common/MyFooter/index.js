import React from "react";
import { Layout } from "antd";
import { FooterContent } from "../../component";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer style={{ padding: "10px 0 0 0" }}>
      <FooterContent />
    </Footer>
  );
};

export default MyFooter;
