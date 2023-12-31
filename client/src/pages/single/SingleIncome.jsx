import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleIncome = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  const [data, setData] = useState({
    product_name: "",
    amount: "",
    price: "",
    description: "",
    category_name: "",
    product_img: "",
    date: "",
  });

  const { incomeId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/incomes/${incomeId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data,
            product_name: res.data[0].product_name,
            amount: res.data[0].amount,
            price: res.data[0].price,
            description: res.data[0].description,
            category_name: res.data[0].category_name,
            product_img: res.data[0].product_img,
            date: res.data[0].date,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data.date);

  return isAuthenticated ? (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={`http://localhost:8800/images/${data.product_img}`}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.product_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Amount:</span>
                  <span className="itemValue">{data.amount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sold for:</span>
                  <span className="itemValue">{data.price} birr</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">{data.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue status">{data.category_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Transaction Date:</span>
                  <span className="itemValue">{data.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SingleIncome;
