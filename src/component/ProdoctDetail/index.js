import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Image, Typography, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import "./index.css";
import { customFetch } from "../../utils/axios";
import {  useSelector } from "react-redux";
import { selectCurrentUserIsAdmin } from "../../features/auth/authSlice";
import CounterButton from "../CounterButton";
const { Title } = Typography;
const ProductDetail = () => {
  const { productId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const isAdmin = useSelector(selectCurrentUserIsAdmin);
  const getProductById = async (id) => {
    setLoading(true);
    try {
      const resp = await customFetch.post("/products/getProductById", {
        product_id: productId,
      });
      const product = resp.data.product;
      setProduct(product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/*");
    }
  };
  useEffect(() => {
    if (productId.length > 0) {
      getProductById(productId);
    }
  }, [productId]);
  return (
    <section className="product-page">
      {isLoading ? (
        <Spin size="large" />
      ) : product ? (
        <article className="product-container">
          <div className="left-side">
            <Image
              src={`https://${product.image}`}
              alt={product.name}
              preview={false}
              className="left-side"
            />
          </div>
          <div className="right-side">
            <Title level={5}>{product.category}</Title>
            <Title
              level={3}
              className="product-name"
              style={{ marginTop: "0" }}
            >
              {product.name}
            </Title>
            <Title style={{ marginTop: "0" }}>{`$${product.price.toFixed(
              2
            )}`}</Title>
            <p className="description">{product.description}</p>
            <ul className="product-buttons">
              <li className="list-button">
                <CounterButton
                  product_id={productId}
                  max={product.quantity}
                  product={product}
                />
              </li>
              <li className="list-button">
                {isAdmin && (
                  <Link to={`/edit-product/${product.product_id}`}>
                    <Button block>Edit</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </article>
      ) : (
        <p>Can't see</p>
      )}
    </section>
  );
};

export default ProductDetail;
