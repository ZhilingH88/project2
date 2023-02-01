import { Layout } from "antd";
import React, { Fragment } from "react";
import MyFooter from "../MyFooter";
import MyHeader from "../MyHeader";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { getUser } from "../../features/user/userSlice";
import { customFetch, privateFetch } from "../../utils/axios";
import "./index.css";

const { Content } = Layout;
const MyLayout = ({ children }) => {
  const isLoggedin = useSelector((store) => store.user.isLoggedin);
  console.log(isLoggedin);
  const [accessToken, setAccessToken] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const dispatch = useDispatch();
  const refreshToken = async () => {
    try {
      const resp = await customFetch.get("/users/token");
      const decoded = jwtDecode(resp.data.accessToken);
      setAccessToken(resp.data.accessToken);
      setExpireTime(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  };
  privateFetch.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expireTime * 1000 < currentDate.getTime()) {
        const resp = await customFetch.get("/users/token");
        config.headers.Authorization = `Bearer ${resp.data.accessToken}`;
        setAccessToken(resp.data.accessToken);
        const decoded = jwtDecode(resp.data.accessToken);
        setExpireTime(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    refreshToken();
    dispatch(getUser(accessToken));
  }, []);
  return (
    <Layout>
      <MyHeader />
      <Content className="content" style={{ height: "100vh" }}>
        {children}
      </Content>
      <MyFooter />
    </Layout>
  );
};

export default MyLayout;
