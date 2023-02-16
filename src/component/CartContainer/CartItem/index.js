import React, { useState } from "react";
import { Button, Avatar, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "../../../features/cart/cartApiSlice";
import { toast } from "react-toastify";
import "./index.css";
import CounterButton from "../../CounterButton";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import {
  calculateTotals,
  removeItemFromCart,
} from "../../../features/cart/cartSlice";
const CartItem = ({ item }) => {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const removeProductFromCart = async () => {
    if (!user) {
      dispatch(removeItemFromCart(item.product_id));
      dispatch(calculateTotals());
      return;
    }
    try {
      const resp = await removeFromCart({
        product_id: item.product_id,
      }).unwrap();
      toast.success(`${resp.message}`);
    } catch (error) {
      if (!error.status) {
        toast.error("No Server Response");
      } else if (error.status) {
        toast.error(`${error.data.message}`);
      } else {
        toast.error("Failed to remove product");
      }
    }
  };

  return (
    <List.Item key={item.product_id} className="cart-list">
      <div className="cart-image">
        <Avatar shape="square" size={64} src={`https://${item.image}`} />
      </div>
      <div className="item-info">
        <div className="nameAndprice">
          <h4>{item.name}</h4>
          <h3>{`$${item.price.toFixed(2)}`}</h3>
        </div>
        <div className="product-controls">
          <CounterButton
            size={"small"}
            product_id={item.product_id}
            max={item.stock}
          />
          <Button type="link" onClick={removeProductFromCart}>
            remove
          </Button>
        </div>
      </div>
    </List.Item>
  );
};

export default CartItem;
