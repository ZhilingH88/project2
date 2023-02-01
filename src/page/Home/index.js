import { MyLayout, Selector } from "../../common";
import { Button } from "antd";
import { PRODUCT_FILTER } from "../../content/Product_Filter";

import "./index.css";

const Home = () => {
  return (
    <MyLayout>
      <section className="product">
        <div className="product-header">
          <h1>Product</h1>
          <div className="header-left">
            <Selector options={PRODUCT_FILTER}></Selector>
            <Button type="primary">Add Product</Button>
          </div>
        </div>
        <div>
          <h2>Show product</h2>
        </div>
      </section>
    </MyLayout>
  );
};

export default Home;
