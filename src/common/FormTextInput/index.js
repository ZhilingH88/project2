import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";

const FormTextInput = (props) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      validateStatus={props.validateStatus}
      hasFeedback={true}
      help={props.help}
      required={props.required}
    >
      <Input
        className="form-input"
        type={props.input_type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        suffix={props.suffix}
      ></Input>
    </Form.Item>
  );
};

export default FormTextInput;
