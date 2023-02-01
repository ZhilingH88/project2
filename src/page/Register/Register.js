import React, { useEffect, useState } from "react";
import { LoginForm, SignUpForm } from "../../component";
import { MyModal } from "../../common";
import { MODAL_TYPE } from "../../content/Modal_Type";
import { useLocation } from "react-router-dom";
import ForgetPassword from "../../component/RegisterForm/ForgetPassword";

const Register = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);
  const [modalType, setModalType] = useState(path);
  useEffect(() => {
    setModalType(path);
  }, [path]);

  let title = "";
  let subtitle;
  switch (modalType) {
    case MODAL_TYPE.SIGNUP:
      title = "Sign up an Account";
      break;
    case MODAL_TYPE.UPDATE_PASSWORD:
      title = "Update your password";
      subtitle = "Enter your email link, we will send you the recover link";
      break;
    default:
      title = "Sign in to your Account";
  }
  const props = {
    title: title,
    subtitle: subtitle,
  };
  return (
    <MyModal {...props}>
      {modalType === MODAL_TYPE.LOGIN && <LoginForm />}
      {modalType === MODAL_TYPE.SIGNUP && <SignUpForm />}
      {modalType === MODAL_TYPE.UPDATE_PASSWORD && <ForgetPassword />}
    </MyModal>
  );
};

export default Register;
