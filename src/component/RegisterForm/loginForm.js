import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormTextInput } from "../../common";
import { LOGIN_FORM_TEXT } from "../../content/RegisterFormContent";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Form } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.css";

import { isEmpty, isEmailValid } from "../../utils/RegisterHelper";
import { resetState, userLogin } from "../../features/user/userSlice";

const LoginForm = () => {
  const initEmail = {
    value: "",
    status: "",
    message: "",
  };
  const initPassword = {
    value: "",
    status: "",
    message: "",
  };
  const [email, setEmail] = useState(initEmail);
  const [password, setPassword] = useState(initPassword);
  const [visible, setVisible] = useState(false);
  const { isLoading, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status) {
    navigate("/");
    dispatch(resetState());
  }

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === LOGIN_FORM_TEXT.EMAIL_NAME) {
      setEmail({ ...initEmail, value: value });
    }
    if (name === LOGIN_FORM_TEXT.PASSWORD_NAME) {
      setPassword({ ...initPassword, value: value });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPassword = password.value;
    let finalResult = true;
    if (!isEmpty(userEmail)) {
      if (isEmailValid(userEmail)) {
        finalResult = finalResult && true;
      } else {
        finalResult = false;
        setEmail({
          ...email,
          status: "error",
          message: LOGIN_FORM_TEXT.EMAIL_ERROR,
        });
      }
    } else {
      finalResult = false;
      setEmail({
        ...email,
        status: "error",
        message: LOGIN_FORM_TEXT.EMPTY_ERROR,
      });
    }
    if (!isEmpty(userPassword)) {
      finalResult = finalResult && true;
    } else {
      finalResult = false;
      setPassword({
        ...password,
        status: "error",
        message: LOGIN_FORM_TEXT.EMPTY_ERROR,
      });
    }
    if (finalResult) {
      const user = { email: userEmail, password: userPassword };
      dispatch(userLogin(user));
    }
  };

  return (
    <>
      <Form layout="vertical" disabled={isLoading}>
        <FormTextInput
          label={LOGIN_FORM_TEXT.EMAIL}
          name={LOGIN_FORM_TEXT.EMAIL_NAME}
          validateStatus={email.status}
          help={email.message}
          required={true}
          input_type="text"
          value={email.value}
          onChange={handleOnChange}
        ></FormTextInput>
        <FormTextInput
          label={LOGIN_FORM_TEXT.PASSWORD}
          name={LOGIN_FORM_TEXT.PASSWORD_NAME}
          validateStatus={password.status}
          help={password.message}
          required={true}
          input_type={visible ? "text" : "password"}
          value={password.value}
          onChange={handleOnChange}
          suffix={
            <Button type="text" onClick={() => setVisible(!visible)}>
              {visible ? <FaEye /> : <FaEyeSlash />}
            </Button>
          }
        ></FormTextInput>
        <Form.Item>
          <Button
            type="primary"
            block
            onClick={handleOnSubmit}
            loading={isLoading}
          >
            {LOGIN_FORM_TEXT.BUTTON_TEXT}
          </Button>
        </Form.Item>
      </Form>
      <span className="message">
        <div>
          <p className="">
            {LOGIN_FORM_TEXT.HELP_MESSAGE}
            <Link to={LOGIN_FORM_TEXT.HELP_LINK}>
              {LOGIN_FORM_TEXT.HELP_LINK_TEXT}
            </Link>
          </p>
        </div>
        <div className="div">
          <Link to={LOGIN_FORM_TEXT.FORGET_PASSWORD_LINK}>
            {LOGIN_FORM_TEXT.FORGET_PASSWORD}
          </Link>
        </div>
      </span>
      <Outlet />
    </>
  );
};

export default LoginForm;
