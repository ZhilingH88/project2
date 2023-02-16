import React from "react";
import { Layout } from "antd";
import { FooterContent } from "../../component";
import "./index.css";
const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer style={{ padding: 0 }} className="footer">
      <FooterContent />
    </Footer>
  );
};

export default MyFooter;
