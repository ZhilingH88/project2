import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ServerFailed = (props) => {
  const navigate = useNavigate();
  return (
    <Result
      status={props.status}
      title={props.title}
      subTitle={props.subTitle}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          Back
        </Button>
      }
    />
  );
};

export default ServerFailed;
