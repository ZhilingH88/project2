import { Form, Row, Col, Typography, Button, Image, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import { FormTextInput, Selector } from "../../common";
import "./index.css";
import image from "./fallback.PNG";
import validator from "validator";
import { PRODUCT_FORM, CATEGORY } from "../../content/Product_Form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} from "../../features/products/productApiSlice";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { calculateTotals } from "../../features/cart/cartSlice";
const { Title } = Typography;
const ProductForm = () => {
  let initState = {
    name: {
      value: "",
      status: "",
      message: "",
    },
    description: {
      value: "",
      status: "",
      message: "",
    },
    category: {
      value: "",
      status: "",
      message: "",
    },
    price: {
      value: "",
      status: "",
      message: "$#.## format",
    },
    quantity: {
      value: "",
      status: "",
      message: "",
    },
    image_link: {
      value: "",
      status: "",
      message: "",
    },
  };
  const [formData, setFormData] = useState(initState);
  const [img, setImg] = useState(image);
  const [validImg, setValidImg] = useState(true);
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [editProduct, result] = useEditProductMutation();
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isEditMethod, setIsEditMethod] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const getProductById = async (id) => {
    try {
      setIsEditLoading(true);
      const resp = await customFetch.post("/products/getProductById", {
        product_id: productId,
      });
      const product = resp.data.product;
      setFormData((prev) => ({
        name: {
          ...prev.name,
          value: product.name,
        },
        description: {
          ...prev.description,
          value: product.description,
        },
        category: {
          ...prev.category,
          value: product.category,
        },
        price: {
          ...prev.price,
          value: product.price,
        },
        quantity: {
          ...prev.quantity,
          value: product.quantity,
        },
        image_link: {
          ...prev.image_link,
          value: product.image,
        },
      }));
      if (product.image) setImg(`https://${product.image}`);
      setIsEditLoading(false);
    } catch (error) {
      setIsEditLoading(false);
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (productId) {
      setIsEditMethod(true);
      getProductById(productId);
    } else {
      setIsEditMethod(false);
    }
  }, [productId]);

  const handleOnchange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "price") {
      value = Number.parseFloat(value).toFixed(2);
    }
    setFormData({
      ...formData,
      [name]: { ...formData[name], value: value, message: "", status: "" },
    });
  };
  const handleSelectorChange = (value) => {
    setFormData({
      ...formData,
      category: { ...formData.category, value: value, message: "", status: "" },
    });
  };
  const handleUploadImage = (e) => {
    e.preventDefault();
    if (!validator.isEmpty(formData.image_link.value)) {
      setValidImg(true);
      setImg(`https://${formData.image_link.value}`);
    }
  };
  const imageOnError = () => {
    setFormData({
      ...formData,
      image_link: {
        ...formData.image_link,
        value: image,
        message: "Can't load image",
        status: "error",
      },
    });
    setValidImg(false);
  };
  const checkEmpty = useCallback(
    (valueName, value) => {
      if (validator.isEmpty(`${value}`)) {
        setFormData((prev) => ({
          ...prev,
          [valueName]: {
            ...prev[valueName],
            message: "Can't be empty",
            status: "error",
          },
        }));
        return false;
      }
      return true;
    },
    [formData]
  );
  const checkQuantity = (value) => {
    if (!validator.isInt(`${value}`)) {
      setFormData((prev) => ({
        ...prev,
        quantity: {
          ...prev.quantity,
          message: "Enter Integer",
          status: "error",
        },
      }));
      return false;
    }
    return true;
  };
  const [deleteProduct, deleteResult] = useDeleteProductMutation();
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const resp = await deleteProduct({ product_id: productId }).unwrap();
      toast.success(`${resp.message}`);
      setFormData(initState);
      dispatch(calculateTotals());
      navigate("/");
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let action = e.currentTarget.name;
    const nameValid = checkEmpty("name", formData.name.value);
    const categoryValid = checkEmpty("category", formData.category.value);
    const priceValid = checkEmpty("price", formData.price.value);
    const quantityValid =
      checkEmpty("quantity", formData.quantity.value) &&
      checkQuantity(formData.quantity.value);
    if (nameValid && categoryValid && priceValid && quantityValid && validImg) {
      const product = {
        name: formData.name.value,
        description: formData.description.value,
        category: formData.category.value,
        price: formData.price.value,
        quantity: formData.quantity.value,
        image: formData.image_link.value,
      };
      if (action === "add") {
        try {
          const resp = await addProduct(product).unwrap();
          toast.success(`${resp.message}`);
          setFormData(initState);
          navigate("/");
        } catch (error) {
          if (!error.status) {
            toast.error("No Server Response");
          } else if (error.status) {
            toast.error(`${error.data.message}`);
          } else {
            toast.error("Failed to create product");
          }
        }
      } else if (action === "edit") {
        try {
          const resp = await editProduct({
            product_id: productId,
            edit_part: product,
          }).unwrap();
          toast.success(`${resp.message}`);
          setFormData(initState);
          dispatch(calculateTotals());
          navigate("/");
        } catch (error) {
          if (!error.status) {
            toast.error("No Server Response");
          } else if (error.status) {
            toast.error(`${error.data.message}`);
          } else {
            toast.error("Failed to create product");
          }
        }
      }
    }
  };

  return (
    <section className="form-container">
      <div className="product-form">
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <Title level={2} className="form-header">
              {isEditMethod ? "Edit Product" : "Create Product"}
            </Title>
          </Col>
          <Col span={4}></Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="form">
            {isEditLoading ? (
              <Spin />
            ) : (
              <Form
                layout="vertical"
                disabled={
                  isLoading || result.isLoading || deleteResult.isLoading
                }
              >
                <FormTextInput
                  label={PRODUCT_FORM.PRODUCT_NAME_LABEL}
                  name={PRODUCT_FORM.PRODUCT_NAME}
                  input_type="text"
                  value={formData.name.value}
                  onChange={handleOnchange}
                  validateStatus={formData.name.status}
                  help={formData.name.message}
                  defaultValue={formData.name.value}
                ></FormTextInput>
                <Form.Item
                  label={PRODUCT_FORM.PRODUCT_DESCRIPTION_LABEL}
                  name={PRODUCT_FORM.PRODUCT_DESCRIPTION_NAME}
                  validateStatus={formData.description.status}
                  help={formData.description.message}
                  initialValue={formData.description.value}
                >
                  <TextArea
                    rows={5}
                    onChange={handleOnchange}
                    name={PRODUCT_FORM.PRODUCT_DESCRIPTION_NAME}
                    value={formData.description.value}
                  ></TextArea>
                </Form.Item>
                <Row gutter={8} wrap>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                  >
                    <Form.Item
                      label={PRODUCT_FORM.CATEGORY_LABEL}
                      name={PRODUCT_FORM.CATEGORY_NAME}
                      validateStatus={formData.category.status}
                      help={formData.category.message}
                    >
                      <Selector
                        name={PRODUCT_FORM.CATEGORY_NAME}
                        options={CATEGORY}
                        defaultValue={formData.category.value}
                        onChange={handleSelectorChange}
                        placeholder={"Select a category"}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                  >
                    <FormTextInput
                      label={PRODUCT_FORM.PRICE_LABEL}
                      name={PRODUCT_FORM.PRICE_NAME}
                      value={formData.price.value}
                      defaultValue={formData.price.value}
                      input_type="number"
                      prefix="$"
                      controls={false}
                      step="0.01"
                      onChange={handleOnchange}
                      validateStatus={formData.price.status}
                      help={formData.price.message}
                    ></FormTextInput>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                  >
                    <FormTextInput
                      label={PRODUCT_FORM.QUANTITY_LABEL}
                      name={PRODUCT_FORM.QUANTITY_NAME}
                      value={formData.quantity.value}
                      defaultValue={formData.quantity.value}
                      input_type="number"
                      onChange={handleOnchange}
                      validateStatus={formData.quantity.status}
                      help={formData.quantity.message}
                    ></FormTextInput>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                  >
                    <FormTextInput
                      label={PRODUCT_FORM.IMAGE_LABEL}
                      name={PRODUCT_FORM.IMAGE_LABEL_NAME}
                      value={formData.image_link.value}
                      validateStatus={formData.image_link.status}
                      defaultValue={formData.image_link.value}
                      help={formData.image_link.message}
                      input_type="text"
                      prefix="http://"
                      suffix={
                        <Button
                          className="productForm-btn"
                          size="small"
                          onClick={handleUploadImage}
                        >
                          Upload
                        </Button>
                      }
                      onChange={handleOnchange}
                    ></FormTextInput>
                  </Col>
                </Row>
                <Row justify={"center"} className="image-container">
                  <Form.Item>
                    <Image
                      alt={"image preview"}
                      src={img}
                      onError={imageOnError}
                    />
                  </Form.Item>
                </Row>
                <Form.Item>
                  <Space size={8}>
                    <Button
                      className="productForm-btn"
                      onClick={handleFormSubmit}
                      loading={isLoading || result.isLoading}
                      name={isEditMethod ? "edit" : "add"}
                    >
                      {isEditMethod ? "Edit Product" : "Add Product"}
                    </Button>
                    {isEditMethod && (
                      <Button
                        className="productForm-btn"
                        onClick={handleDeleteProduct}
                        loading={deleteResult.isLoading}
                      >
                        Delete
                      </Button>
                    )}
                  </Space>
                </Form.Item>
              </Form>
            )}
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </section>
  );
};

export default ProductForm;
