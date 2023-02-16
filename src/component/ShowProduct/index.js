import React, { useEffect, useState, useCallback } from "react";
import { Selector } from "../../common";
import { Button, Row, Col, Spin, Pagination } from "antd";
import { PRODUCT_FILTER } from "../../content/Product_Filter";
import "./index.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import paginate from "../../utils/paginate";
import { showProducts } from "../../features/products/productSlice";
import { MyCard } from "../../component";
import { selectCurrentUserIsAdmin } from "../../features/auth/authSlice";
import { productsSorted } from "../../utils/productSort";
const ShowProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((store) => store.products);
  const [currentPage, setCurrentPage] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filter, setFilter] = useState("newest");
  const [productList, setProductList] = useState([]);
  const isAdmin = useSelector(selectCurrentUserIsAdmin);

  useEffect(() => {
    dispatch(showProducts());
  }, []);
  useEffect(() => {
    if (products.length > 0) {
      setIsEmpty(false);
      const sortList = productsSorted(products, filter);
      const productsPerPage = paginate(8, sortList);
      setProductList(productsPerPage[currentPage]);
    } else {
      setIsEmpty(true);
    }
  }, [products, currentPage, filter]);

  const onFilterChange = (value) => {
    setFilter(value);
  };
  const handlePagination = (page) => {
    setCurrentPage(page - 1);
  };
  return (
    <section className="product">
      <div className="product-header">
        <h1>Products</h1>
        <div className="header-left">
          <div className="selector">
            <Selector
              options={PRODUCT_FILTER}
              defaultValue={"newest"}
              onChange={onFilterChange}
            ></Selector>
          </div>
          {isAdmin && (
            <Link to="/create-product">
              <Button>Add Product</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="show-products">
        <Row
          gutter={[
            { xs: 8, sm: 12, md: 16, lg: 24 },
            { xs: 8, sm: 12, md: 16, lg: 24 },
          ]}
          className="show-product"
        >
          {isLoading ? (
            <Spin size="large" />
          ) : isEmpty ? (
            <h1>Empty Products List</h1>
          ) : (
            productList.map((item) => {
              return (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={6}
                  xxl={4}
                  key={item.product_id}
                >
                  <MyCard
                    title={item.name}
                    defaultValue={0}
                    image={item.image}
                    alt={item.name}
                    id={item.product_id}
                    price={item.price}
                    quantity={item.quantity}
                  />
                </Col>
              );
            })
          )}
        </Row>
        {!isLoading && (
          <Row justify={"end"}>
            <Pagination
              current={currentPage + 1}
              defaultPageSize={8}
              total={products.length}
              onChange={handlePagination}
            />
          </Row>
        )}
      </div>
    </section>
  );
};

export default ShowProducts;
