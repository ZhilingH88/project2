import React, { useState } from "react";
import { AlldoneResult, FormTextInput } from "../../common";
import { FORGET_PASSWORD_TEXT } from "../../content/RegisterFormContent";

import { Button, Form } from "antd";
import "./index.css";

import { isEmpty, isEmailValid } from "../../utils/RegisterHelper";
import { MailOutlined } from "@ant-design/icons";

const ForgetPassword = () => {
  const initEmail = {
    value: "",
    status: "",
    message: "",
  };
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState(initEmail);
  const handleOnChange = (e) => {
    const value = e.target.value;
    setEmail({ ...email, value: value });
  };
  const handleOnSubmit = () => {
    const userEmail = email.value;
    let finalResult = true;
    if (!isEmpty(userEmail)) {
      if (isEmailValid(userEmail)) {
        finalResult = finalResult && true;
      } else {
        finalResult = false;
        setEmail({
          ...email,
          status: "error",
          message: FORGET_PASSWORD_TEXT.EMAIL_ERROR,
        });
      }
    } else {
      finalResult = false;
      setEmail({
        ...email,
        status: "error",
        message: FORGET_PASSWORD_TEXT.EMPTY_ERROR,
      });
    }
    if (finalResult) {
      const user = { email: userEmail };
      setSubmit(true);
    }
  };

  return (
    <>
      {submit ? (
        <AlldoneResult
          icon={<MailOutlined />}
          title={
            "We habe sent the update password link to your email,please check that"
          }
        />
      ) : (
        <Form layout="vertical">
          <FormTextInput
            label={FORGET_PASSWORD_TEXT.EMAIL}
            name={FORGET_PASSWORD_TEXT.EMAIL_NAME}
            validateStatus={email.status}
            help={email.message}
            required={true}
            hasFeedback={true}
            input_type="text"
            value={email.value}
            onChange={handleOnChange}
          ></FormTextInput>
          <Form.Item>
            <Button type="primary" block onClick={handleOnSubmit}>
              {FORGET_PASSWORD_TEXT.BUTTON_TEXT}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default ForgetPassword;
