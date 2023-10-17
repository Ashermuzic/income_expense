import React, { useEffect, useState } from "react";
import "./notification.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import axios from "axios";
import { Link } from "react-router-dom";

function Notification() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/products/danger")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="notification">
      <div className="notificationTitle">Notifications</div>
      <div className="notificationBody">
        <div className="notificationCards">
          {data.map((notification) => {
            return (
              <div className="notificationCard">
                - You are running low on
                <span className="product">{notification.product_name}</span>.
                Current amount is
                <span className="product">{notification.amount}</span>
                <Link to="/products" style={{ textDecoration: "none" }} n>
                  <div className="button">
                    <ArrowRightIcon className="icon" />
                    view product
                  </div>
                </Link>
                <div className="n-category">{notification.category_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notification;
