import React, { useCallback, useState } from "react";
import { InputNumber, Button, Space, Input, Tooltip } from "antd";
import { useReduceFromCartMutation } from "../../features/cart/cartApiSlice";
import "./index.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  calculateTotals,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
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
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleInclement = async (e) => {
    e.preventDefault();
    await addProductToCart();
  };
  const handleDecrease = async (e) => {
    e.preventDefault();
    let value = count - 1;
    if (value <= 0) {
      setCount(0);
    } else {
      setCount((prev) => {
        return parseInt(prev) - 1;
      });
    }
    if (!user) {
      if (value <= 0) {
        dispatch(removeItemFromCart(product_id));
      } else {
        dispatch(reduceItemFromCart(product_id));
      }
      dispatch(calculateTotals());
      return;
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
    <div className="counter-container">
      <Tooltip placement="top" title={`${max} in Stock`}>
        <Button
          className="counter-btn"
          size={size}
          onClick={handleInclement}
          disabled={result.isLoading || addIsLoading}
        >
          +
        </Button>
      </Tooltip>
      <input value={count} disabled={true} className="counter-input" />
      <Button
        className="counter-btn"
        size={size}
        onClick={handleDecrease}
        disabled={result.isLoading || addIsLoading}
      >
        -
      </Button>
    </div>
  );
};

export default Counter;

{
  /* <InputNumber
controls={false}
defaultValue={count}
value={count}
size={size}
style={{ width: "100px" }}
max={max}
min={0}
disabled={true}
></InputNumber> */
}
