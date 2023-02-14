import "./App.css";
import Router from "./Router/Router";
import "react-toastify/dist/ReactToastify.css";
import { calculateTotals, setCartItem } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "./features/cart/cartApiSlice";
import { useEffect } from "react";
function App() {
  return <Router />;
}

export default App;
