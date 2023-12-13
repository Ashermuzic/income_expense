import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "./stat.scss";
import Widget from "../../widget/Widget";
import Featured from "../../featured/Featured";
import Chart from "../../chart/Chart";
import Table from "../../table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const Stat = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  const [productsCount, setProductsCount] = useState();
  const [incomesCount, setIncomesCount] = useState();
  const [expensesCount, setExpensesCount] = useState();
  const [netEarning, setNetEarning] = useState([]);

  useEffect(() => {
    // count of the products
    axios
      .get("http://localhost:8800/products/countAll")
      .then((res) => {
        if (res.status == 200) {
          setProductsCount(res.data[0].products);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // count of the income
    axios
      .get("http://localhost:8800/incomes/count")
      .then((res) => {
        if (res.status == 200) {
          setIncomesCount(res.data[0].incomes);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // count of the expense
    axios
      .get("http://localhost:8800/expense/count")
      .then((res) => {
        if (res.status == 200) {
          setExpensesCount(res.data[0].expenses);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // net income of the month
    axios
      .get("http://localhost:8800/stats/net_earning")
      .then((res) => {
        if (res.status == 200) {
          setNetEarning(res.data[0].netEarnings);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return isAuthenticated ? (
    <div className="home">
      <div className="homeContainer">
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  ) : null;
};

export default Stat;
