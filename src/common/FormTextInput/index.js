import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";

const FormTextInput = (props) => {
  return (
    <Form.Item
      label={props.label}
      name={props.name}
      validateStatus={props.validateStatus}
      hasFeedback={props.hasFeedback}
      help={props.help}
      required={props.required}
      initialValue={props.defaultValue}
    >
      <Input
        className="form-input"
        type={props.input_type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        controls={props.controls}
        prefix={props.prefix}
        suffix={props.suffix}
        step={props.step}
      ></Input>
    </Form.Item>
  );
};

export default FormTextInput;
