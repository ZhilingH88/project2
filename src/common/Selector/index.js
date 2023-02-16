import { Select } from "antd";
import React, { useState } from "react";

const Selector = ({
  placeholder,
  name,
  options,
  defaultValue,
  style,
  onChange,
}) => {
  return (
    <Select
      name={name}
      style={style}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      dropdownMatchSelectWidth={false}
      placeholder={placeholder}
      bordered={false}
    ></Select>
  );
};

export default Selector;
