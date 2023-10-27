import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
      <Sidebar />

      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="products" amount={productsCount} diff={20} />
          <Widget type="incomes" amount={incomesCount} diff={20} />
          <Widget type="expenses" amount={expensesCount} diff={20} />
          <Widget type="history" amount={netEarning} diff={20} />
        </div>
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

export default Home;
