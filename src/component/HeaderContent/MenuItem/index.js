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
import { useGetCartQuery } from "../../../features/cart/cartApiSlice";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from "../../../features/auth/authSlice";
import { userLogout } from "../../../features/user/userSlice";
import {
  clearCart,
  setCartItem,
  calculateTotals,
} from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../../utils/localStorage";

const { Item } = Menu;

const MenuItem = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [userLogout, result] = useUserLogoutMutation();
  const { amount, subtotal } = useSelector((store) => store.cart);
  const [userName, setUserName] = useState(null);
  const token = getUserFromLocalStorage("token");
  const userResult = useGetUserQuery(undefined, {
    skip: token == null,
  });
  useEffect(() => {
    setUserName(user?.split("@")[0]);
    if (userResult?.data?.user) {
      dispatch(
        setCredentials({
          userEmail: userResult.data.user,
          isAdmin: userResult.data.isAdmin,
        })
      );
      setUserName(userResult.data.user.split("@")[0]);
    }
  }, [userResult, user]);
  const { data, isLoading, error } = useGetCartQuery(undefined, {
    skip: token == null,
  });
  const cartItems = data?.cartItems;
  useEffect(() => {
    if (cartItems && token) {
      dispatch(setCartItem(cartItems));
      dispatch(calculateTotals());
    }
  }, [cartItems, token]);
  const handleOnClick = async () => {
    try {
      const resp = await userLogout().unwrap();
      removeUserFromLocalStorage("token");
      dispatch(clearCart());
      dispatch(logOut());
      setUserName(null);
      toast.success(`${resp.message}`);
    } catch (error) {
      removeUserFromLocalStorage("token");
      dispatch(clearCart());
      dispatch(logOut());
      setUserName(null);
    }
  };

  return (
    <div className="navbar">
      <ul className="menu">
        <li>
          {token ? (
            <LogoutDropDown handleOnClick={handleOnClick}>
              <Button
                type="link"
                className="btn"
                loading={userResult.isLoading || result.isLoading}
              >
                <FaUser className="icon" />
                <p>{userResult.isLoading ? "Loading..." : userName}</p>
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
                loading={userResult.isLoading}
              >
                <FaUser className="icon" />
                <p>{token ? "Loading..." : "Sign in"}</p>
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
            <Button
              type="link"
              className="btn cart_container"
              loading={isLoading}
            >
              <Badge size="small" count={amount}>
                <Avatar
                  shape="square"
                  icon={<FaShoppingCart className="icon" />}
                ></Avatar>
              </Badge>
              <p>{isLoading ? "Loading..." : `$${subtotal.toFixed(2)}`}</p>
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MenuItem;
