import { Modal, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./index.css";

const { Title, Text } = Typography;

const MyModal = (props) => {
  const { isOpen } = useSelector((store) => store.modal);
  return (
    <Modal
      title={
        <div className="title">
          <Title level={2}>{props.title}</Title>
          {props.subtitle && (
            <Text type="secondary" className="subtitle">
              {props.subtitle}
            </Text>
          )}
        </div>
      }
      open={isOpen}
      style={props.style}
      footer={null}
      closeIcon={
        <Link to={props.background.pathname}>
          <GrClose />
        </Link>
      }
    >
      {props.children}
    </Modal>
  );
};

export default MyModal;
