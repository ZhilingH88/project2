import React, { useState, useEffect } from "react";
import { useAddToCartMutation } from "../../../features/cart/cartApiSlice";
import { Button } from "antd";
import { Counter } from "../../../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { findNumberProductInCart } from "../../../utils/productSort";
const CounterButton = (props) => {
  const [count, setCount] = useState(null);
  const { cartItems } = useSelector((store) => store.cart);
  const [addToCart, result] = useAddToCartMutation();
  useEffect(() => {
    const quantity = findNumberProductInCart(cartItems, props.product_id);
    setCount(quantity);
  }, [cartItems]);
  const addProductToCart = async () => {
    setCount((prev) => {
      if (prev + 1 >= props.max) {
        return props.max;
      }
      return prev + 1;
    });
    try {
      const resp = await addToCart({ product_id: props.product_id }).unwrap();
      toast.success(`${resp.message}`);
    } catch (error) {
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
    <div style={{ width: "100px" }}>
      {count === 0 ? (
        <Button
          type="primary"
          onClick={addProductToCart}
          block
          loading={result.isLoading}
          disabled={props.max === 0}
        >
          {props.max === 0 ? "Out of Stock" : "Add"}
        </Button>
      ) : (
        <Counter
          count={count}
          setCount={setCount}
          size={props.size}
          max={props.max}
          product_id={props.product_id}
          addProductToCart={addProductToCart}
          addIsLoading={result.isLoading}
        />
      )}
    </div>
  );
};

export default CounterButton;
