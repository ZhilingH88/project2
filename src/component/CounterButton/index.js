import React, { useState, useEffect } from "react";
import { useAddToCartMutation } from "../../features/cart/cartApiSlice";
import { Button } from "antd";
import { Counter } from "../../common";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { findNumberProductInCart } from "../../utils/productSort";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { addItemToCart, calculateTotals } from "../../features/cart/cartSlice";

import "./index.css";
const CounterButton = (props) => {
  const [count, setCount] = useState(0);
  const { cartItems } = useSelector((store) => store.cart);
  const [addToCart, result] = useAddToCartMutation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const quantity = findNumberProductInCart(cartItems, props.product_id);
    setCount(quantity);
  }, [cartItems, props.product_id]);
  const addProductToCart = async () => {
    let addNum = 1;
    let value = count + 1;
    if (value > parseInt(props.max)) {
      addNum = 0;
      if (!user) {
        toast.error("Inventory shortage");
      }
      setCount(props.max);
    } else {
      setCount(value);
    }
    if (!user) {
      dispatch(
        addItemToCart({
          ...props.product,
          product_id: props.product_id,
          stock: props.max,
          quantity: addNum,
        })
      );
      dispatch(calculateTotals());
      return;
    }
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
    <div className="counterBtn-container">
      {count === 0 || props.max === 0 ? (
        <Button
          onClick={addProductToCart}
          className="counter-button"
          block
          disabled={props.max === 0 || result.isLoading}
        >
          <p>{props.max === 0 ? "Out of Stock" : "Add"}</p>
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
