import { Select } from "antd";
import React, { useState } from "react";

const Selector = ({ options, style }) => {
  const onChange = (newValue) => {
    console.log(newValue);
  };
  return (
    <Select
      style={style}
      defaultValue={"newest"}
      onChange={onChange}
      options={options}
      dropdownMatchSelectWidth={false}
    ></Select>
  );
};

export default Selector;
