import "./App.css";
import Router from "./Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer position="top-center"></ToastContainer>
    </>
  );
}

export default App;
