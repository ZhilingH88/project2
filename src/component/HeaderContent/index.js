import React from "react";
import { Input } from "antd";
import { Route, Routes } from "react-router-dom";
import "./index.css";

import MenuItem from "./MenuItem";
import Register from "../../page/Register/Register";

const { Search } = Input;
const HeaderContent = () => {
  return (
    <div className="header-container">
      <div className="header-logo">
        <h2>Management</h2>
        <p>Chuwa</p>
      </div>
      <Search className="search-bar" />
      <div className="menu">
        <MenuItem />
      </div>
    </div>
  );
};

export default HeaderContent;
