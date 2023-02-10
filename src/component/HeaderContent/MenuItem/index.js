import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Dropdown, Menu } from "antd";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import "./index.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUserLogoutMutation,
} from "../../../features/user/userApiSlice";
import { openModal } from "../../../features/modal/modalSlice";
import LogoutDropDown from "../../LogoutDropdown";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "../../../features/auth/authSlice";
import { userLogout } from "../../../features/user/userSlice";
import { clearCart } from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";

const { Item } = Menu;

const MenuItem = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();
  const [userLogout, result] = useUserLogoutMutation();
  const user = useSelector(selectCurrentUser);
  const { amount, subtotal } = useSelector((store) => store.cart);
  const [userName, setUserName] = useState(user?.split("@")[0]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (user) {
      setSuccess(true);
      setUserName(user.split("@")[0]);
    }
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
    }
    if (isError) {
      setSuccess(false);
    }
  }, [isSuccess, isError]);

  const handleOnClick = async () => {
    try {
      const resp = await userLogout().unwrap();
      dispatch(clearCart());
      dispatch(logOut());
      setSuccess(false);
      setUserName("");
      toast.success(`${resp.message}`);
      navigate(0);
    } catch (error) {
      dispatch(clearCart());
      dispatch(logOut());
      navigate(0);
    }
  };

  return (
    <div className="navbar">
      <ul className="menu">
        <li>
          {success ? (
            <LogoutDropDown handleOnClick={handleOnClick}>
              <Button type="link" className="btn" loading={result.isLoading}>
                <FaUser className="icon" />
                <p>{userName}</p>
              </Button>
            </LogoutDropDown>
          ) : (
            <NavLink
              to="/login"
              state={{ background: location }}
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <Button
                type="link"
                className="btn"
                loading={isLoading || result.isLoading}
              >
                <FaUser className="icon" />
                <p>{isLoading ? "Loading..." : "Sign in"}</p>
              </Button>
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/cart"
            state={{ background: location }}
            onClick={() => {
              dispatch(openModal());
            }}
          >
            <Button type="link" className="btn cart_container">
              <Badge size="small" count={amount}>
                <Avatar
                  shape="square"
                  icon={<FaShoppingCart className="icon" />}
                ></Avatar>
              </Badge>
              <p>{`$${subtotal.toFixed(2)}`}</p>
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MenuItem;
