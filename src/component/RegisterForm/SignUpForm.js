import React, { useState } from "react";
import { FormTextInput } from "../../common";
import {
  LOGIN_FORM_TEXT,
  REGISTER_FORM_TEXT,
} from "../../content/RegisterFormContent";
import {
  isEmpty,
  isEmailValid,
  isPasswordValid,
} from "../../utils/RegisterHelper";
import { Button, Form } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetState, userRegister } from "../../features/user/userSlice";

const SignUpForm = ({ background }) => {
  const initEmail = {
    value: "",
    status: "",
    message: "",
  };
  const initPassword = {
    value: "",
    status: "",
    message: REGISTER_FORM_TEXT.PASSWORD_FORMAT_MESSAGE,
  };
  const [email, setEmail] = useState(initEmail);
  const [password, setPassword] = useState(initPassword);
  const [visible, setVisible] = useState(false);
  const { isLoading, status } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status) {
    navigate(background.pathname);
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
          message: REGISTER_FORM_TEXT.EMAIL_ERROR,
        });
      }
    } else {
      finalResult = false;
      setEmail({
        ...email,
        status: "error",
        message: REGISTER_FORM_TEXT.EMPTY_ERROR,
      });
    }
    if (!isEmpty(userPassword)) {
      if (isPasswordValid(userPassword)) {
        finalResult = finalResult && true;
      } else {
        finalResult = false;
        setPassword({
          ...password,
          status: "error",
          message: REGISTER_FORM_TEXT.PASSWORD_ERROR,
        });
      }
    } else {
      finalResult = false;
      setPassword({
        ...password,
        status: "error",
        message: REGISTER_FORM_TEXT.EMPTY_ERROR,
      });
    }
    if (finalResult) {
      const user = { email: userEmail, password: userPassword };
      dispatch(userRegister(user));
    }
  };

  return (
    <>
      <Form layout="vertical" disabled={isLoading}>
        <FormTextInput
          label={REGISTER_FORM_TEXT.EMAIL}
          name={REGISTER_FORM_TEXT.EMAIL_NAME}
          validateStatus={email.status}
          hasFeedback={true}
          help={email.message}
          required={true}
          input_type="text"
          value={email.value}
          onChange={handleOnChange}
        ></FormTextInput>
        <FormTextInput
          label={REGISTER_FORM_TEXT.PASSWORD}
          name={REGISTER_FORM_TEXT.PASSWORD_NAME}
          validateStatus={password.status}
          help={password.message}
          required={true}
          hasFeedback={true}
          input_type="text"
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
            className="form-btn"
            block
            onClick={handleOnSubmit}
            loading={isLoading}
          >
            {REGISTER_FORM_TEXT.BUTTON_TEXT}
          </Button>
        </Form.Item>
      </Form>
      <span className="message">
        <div>
          <p className="">
            {REGISTER_FORM_TEXT.HELP_MESSAGE}
            <Link
              to={REGISTER_FORM_TEXT.HELP_LINK}
              state={{ background: background }}
            >
              {REGISTER_FORM_TEXT.HELP_LINK_TEXT}
            </Link>
          </p>
        </div>
      </span>
      <Outlet />
    </>
  );
};

export default SignUpForm;
