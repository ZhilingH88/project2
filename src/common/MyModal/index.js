import { Modal, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../features/modal/modalSlice";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./index.css";

const { Title, Text } = Typography;

const MyModal = (props) => {
  const dispatch = useDispatch();
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
      open={true}
      centered={true}
      footer={null}
      closeIcon={
        <Link to="/" onClick={() => dispatch(closeModal())}>
          <GrClose />
        </Link>
      }
    >
      {props.children}
    </Modal>
  );
};

export default MyModal;
