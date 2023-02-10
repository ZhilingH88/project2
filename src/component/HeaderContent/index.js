import React from "react";
import { Input, Row, Space, Col } from "antd";
import { Link } from "react-router-dom";
import "./index.css";

import MenuItem from "./MenuItem";

const { Search } = Input;
const HeaderContent = () => {
  return (
    <Row justify="space-between" align="middle" wrap>
      <Col
        xs={{ order: 1, span: 4 }}
        sm={{ order: 1, span: 4 }}
        md={{ order: 1, span: 8 }}
        lg={{ order: 1, span: 8 }}
        xl={{ order: 1, span: 8 }}
      >
        <Link to="/" className="logo-container">
          <div className="header-logo">
            <h2>Management</h2>
            <p>Chuwa</p>
          </div>
        </Link>
      </Col>
      <Col
        xs={{ order: 3, span: 24 }}
        sm={{ order: 3, span: 24 }}
        md={{ order: 2, span: 8 }}
        lg={{ order: 2, span: 8 }}
        xl={{ order: 2, span: 8 }}
      >
        <Search
          placeholder="input search text"
          enterButton
          style={{ display: "block" }}
        />
      </Col>
      <Col
        xs={{ order: 2, span: 20 }}
        sm={{ order: 2, span: 20 }}
        md={{ order: 3, span: 8 }}
        lg={{ order: 3, span: 8 }}
        xl={{ order: 3, span: 8 }}
      >
        <MenuItem />
      </Col>
    </Row>
  );
};

export default HeaderContent;
