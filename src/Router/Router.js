import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { MODAL_TYPE } from "../content/Modal_Type";
import Home from "../page/Home";
import Register from "../page/Register/Register";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}>
        <Route key="login" path="/login" element={<Register />} />
        <Route key="signup" path="/signup" element={<Register />} />
        <Route
          key="update-password"
          path="/update_password"
          element={<Register />}
        />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <h1>Error</h1>
          </div>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
