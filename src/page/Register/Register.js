import React, { useEffect, useState } from "react";
import { LoginForm, SignUpForm, ForgetPassword } from "../../component";
import { MyModal } from "../../common";
import { MODAL_TYPE } from "../../content/Modal_Type";
import { useLocation } from "react-router-dom";

const Register = ({ background }) => {
  const location = useLocation();
  const modalType = location.pathname.slice(1);
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
    background: background,
  };
  let content = <LoginForm background={background} />;
  if (modalType === MODAL_TYPE.SIGNUP) {
    content = <SignUpForm background={background} />;
  } else if (modalType === MODAL_TYPE.UPDATE_PASSWORD) {
    content = <ForgetPassword />;
  }
  return <MyModal {...props}>{content}</MyModal>;
};

export default Register;
