import { Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const LogoutDropDown = ({ children, handleOnClick }) => {
  const items = [
    {
      key: "1",
      label: (
        <Link to="/" onClick={handleOnClick}>
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
