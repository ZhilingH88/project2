import { Button, Input, List, Drawer } from "antd";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, setDiscount } from "../../features/cart/cartSlice";
import CartItem from "./CartItem";
import { getDiscountValue } from "../../content/DummyData";

const CartContainer = ({ background }) => {
  const dispatch = useDispatch();
  const { cartItems, total, discount, tax, subtotal, amount } = useSelector(
    (store) => store.cart
  );
  const [code, setCode] = useState(0);
  const [validDiscount, setValidDiscount] = useState(true);
  const handleDiscount = (e) => {
    setCode(e.target.value);
  };
  return (
    <Drawer
      open={true}
      placement="right"
      title={`Cart(${amount})`}
      mask={false}
      closeIcon={
        <Link to={background.pathname}>
          <GrClose />
        </Link>
      }
      xs={{ width: "100%" }}
    >
      <div className="cart-content">
        <div className="cart-items">
          <List>
            <div className="scroll">
              {cartItems.map((item) => {
                return <CartItem item={item} />;
              })}
            </div>
          </List>
        </div>
        <div className="code">
          <label>Apply Discount Code</label>
          <Input.Group compact style={{ display: "flex" }}>
            <Input
              className="cart-input"
              type="text"
              placeholder="20OFF"
              onChange={handleDiscount}
            ></Input>
            <Button
              className="cart-btn"
              onClick={(e) => {
                e.preventDefault();
                const data = getDiscountValue(code);
                if (data.length > 0) {
                  console.log(data[0].value);
                  dispatch(setDiscount(data[0].value));
                  dispatch(calculateTotals());
                } else {
                  setValidDiscount(false);
                }
              }}
            >
              Apply
            </Button>
          </Input.Group>
          {!validDiscount && <p className="invalid-code">Invalid Code</p>}
        </div>
        <div className="total">
          <div className="text-inline">
            <h4>Subtotal</h4>
            <h4>{`$${subtotal.toFixed(2)}`}</h4>
          </div>
          <div className="text-inline">
            <h4>Tax</h4>
            <h4>{`$${tax.toFixed(2)}`}</h4>
          </div>
          <div className="text-inline">
            <h4>Discount</h4>
            <h4>{`-$${discount.toFixed(2)}`}</h4>
          </div>
          <div className="text-inline">
            <h4>Estimated total</h4>
            <h4>{`$${total.toFixed(2)}`}</h4>
          </div>
        </div>
        <Button className="cart-btn" block>
          Continue Checkout
        </Button>
      </div>
    </Drawer>
  );
};

export default CartContainer;
