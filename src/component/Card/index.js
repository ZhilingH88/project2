import { Card, Image, Col, Row, InputNumber, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { Counter } from "../../common";
import { useAddToCartMutation } from "../../features/cart/cartApiSlice";
import { toast } from "react-toastify";
import { findNumberProductInCart } from "../../utils/productSort";
import CounterButton from "./CounterButton";
const MyCard = (props) => {
  const { isAdmin } = useSelector((store) => store.auth);
  const product = {
    image: props.image,
    name: props.title,
    price: props.price,
  };
  return (
    <Card key={props.key} className="card" size="small">
      <div className="card-container">
        <Link to={`/product-detail/${props.id}`}>
          <Image
            src={`https://${props.image}`}
            alt={props.alt}
            preview={false}
            height={250}
            width={"100%"}
          />
        </Link>
        <div className="titleAndprice">
          <p>{props.title}</p>
          <p>{`$${props.price.toFixed(2)}`}</p>
        </div>
        <div className="counter">
          <CounterButton
            size={"small"}
            product_id={props.id}
            max={props.quantity}
            product={product}
          />
          {isAdmin && (
            <Link to={`/edit-product/${props.id}`}>
              <Button>Edit</Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MyCard;
