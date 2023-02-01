import React from "react";
import { FaYoutube, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import "./index.css";

const FooterContent = () => {
  return (
    <div className="footer-container">
      <p>@20222 All Rights Reserved</p>
      <div className="footer-icons">
        {[<FaYoutube />, <FaTwitter />, <FaFacebookSquare />].map(
          (item, index) => {
            return (
              <a key={`ficon-${index}`} className="icon">
                {item}
              </a>
            );
          }
        )}
      </div>
      <div className="footer-text">
        {["Content Us", "Privacy Polices", "Help"].map((item, index) => {
          return <a key={`ftext-${index}`}>{item}</a>;
        })}
      </div>
    </div>
  );
};

export default FooterContent;
