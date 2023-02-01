import React, { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "./index.css";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../features/user/userSlice";
import { openModal } from "../../../features/modal/modalSlice";
import LogoutDropDown from "../../LogoutDropdown";

const { Item } = Menu;

const MenuItem = () => {
  const dispatch = useDispatch();
  const { isNavLoading, isLoggedin, user } = useSelector((store) => store.user);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user.user) {
      let userName = user.user.split("@")[0];
      setUserName(userName);
    }
  }, [user]);

  return (
    <nav>
      <Menu mode="horizontal" selectable={false} theme="dark" className="menu">
        <Item key="/login" className="menu-item">
          {isLoggedin ? (
            <LogoutDropDown>
              <Button type="link" className="btn" loading={isNavLoading}>
                <FaUser className="icon" />
                <p>{userName}</p>
              </Button>
            </LogoutDropDown>
          ) : (
            <NavLink
              to="/login"
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <Button type="link" className="btn" loading={isNavLoading}>
                <FaUser className="icon" />
                <p>Sign in</p>
              </Button>
            </NavLink>
          )}
        </Item>
        <Item key="/cart" className="menu-item">
          <Button type="link" className="btn">
            <FaShoppingCart className="icon" />
            <p>$0.00</p>
          </Button>
        </Item>
      </Menu>
      <Outlet />
    </nav>
  );
};

export default MenuItem;
