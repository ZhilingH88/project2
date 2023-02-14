export const productsSorted = (products, action_type) => {
  let productList = [...products];
  switch (action_type) {
    case "lowest":
      productList = productList.sort((item1, item2) => {
        return item1.price - item2.price;
      });
      break;
    case "highest":
      productList = productList.sort((item1, item2) => {
        return item2.price - item1.price;
      });
      break;
    default:
      productList = productList.sort((item1, item2) => {
        return new Date(item2.createdAt) - new Date(item1.createdAt);
      });
  }
  return productList;
};

export const findNumberProductInCart = (cartList, product_id) => {
  let quantity = 0;
  cartList.forEach((item) => {
    if (item.product_id === product_id) {
      quantity = item.quantity;
      return;
    }
  });
  return quantity;
};
