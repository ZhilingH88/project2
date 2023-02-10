import React, { useCallback, useState } from "react";
import { InputNumber, Button, Space, Input, Tooltip } from "antd";
import { useReduceFromCartMutation } from "../../features/cart/cartApiSlice";
import "./index.css";
import { toast } from "react-toastify";
const Counter = ({
  count,
  setCount,
  size,
  addProductToCart,
  product_id,
  addIsLoading,
  max,
}) => {
  const [reduceFromCart, result] = useReduceFromCartMutation();

  const handleInclement = async (e) => {
    e.preventDefault();
    await addProductToCart();
  };
  const handleDecrease = async (e) => {
    e.preventDefault();
    let value = count - 1;
    if (value < 0) {
      setCount(0);
    } else {
      setCount((prev) => {
        return parseInt(prev) - 1;
      });
    }
    try {
      const resp = await reduceFromCart({ product_id: product_id }).unwrap();
      toast.success(`${resp.message}`);
    } catch (error) {
      console.log(error);
      if (!error.status) {
        toast.error("No Server Response");
      } else if (error.status) {
        toast.error(`${error.data.message}`);
      } else {
        toast.error("Failed to create product");
      }
    }
  };
  return (
    <Space.Compact direction="horizontal" size={size} align="center" block>
      <Tooltip placement="top" title={`${max} in Stock`}>
        <Button
          type="primary"
          size={size}
          onClick={handleInclement}
          loading={result.isLoading || addIsLoading}
        >
          +
        </Button>
      </Tooltip>
      <InputNumber
        controls={false}
        defaultValue={count}
        value={count}
        style={{ width: "100px" }}
        max={max}
        min={0}
        disabled={true}
      ></InputNumber>
      <Button
        type="primary"
        size={size}
        onClick={handleDecrease}
        loading={result.isLoading || addIsLoading}
      >
        -
      </Button>
    </Space.Compact>
  );
};

export default Counter;
