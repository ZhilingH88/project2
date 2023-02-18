import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
const AlldoneResult = (props) => {
  const navigate = useNavigate();
  return (
    <Result
      icon={props.icon}
      title={props.title}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      }
    />
  );
};

export default AlldoneResult;
