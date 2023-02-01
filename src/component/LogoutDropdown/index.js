import { Dropdown } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
const LogoutDropDown = ({ children }) => {
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/"
          onClick={() => {
            dispatch(userLogout());
          }}
        >
          Log out
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow={{ pointAtCenter: true }}
    >
      {children}
    </Dropdown>
  );
};

export default LogoutDropDown;
