import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Single = () => {
  const [data, setData] = useState({
    product_name: "",
    amount: "",
    description: "",
    category_name: "",
    // product_img: "",
  });

  const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/products/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data,
            product_name: res.data[0].product_name,
            amount: res.data[0].amount,
            description: res.data[0].description,
            category_name: res.data[0].category_name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Link
                style={{ textDecoration: "none" }}
                to={`/products/edit/${productId}`}
              >
                Edit
              </Link>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
                  <span className="itemKey">Description: </span>
                  <span className="itemValue">{data.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue status">{data.category_name}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
