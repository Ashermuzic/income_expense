import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from "axios";
import { useEffect, useState } from "react";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/stats/featured_month").then((res) => {
      setFeatured(res.data);
    });
  }, []);

  // Check if featured[0] exists before accessing its properties
  const totalIncome = featured[0]?.total_income || 0;
  const totalExpense = featured[0]?.total_expense || 0;

  // income and expanse percentage comparison
  const rawPercentage = ((totalIncome - totalExpense) / totalIncome) * 100;

  // Format the percentage for display
  const formattedPercentage =
    rawPercentage > 100
      ? "> 100%"
      : rawPercentage < 0
      ? "< 0%"
      : `${rawPercentage.toFixed(2)}%`;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Monthly Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={Math.min(rawPercentage, 100)}
            text={formattedPercentage}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made this month</p>
        <p className="amount">${totalIncome - totalExpense}</p>
        <p className="desc">income and expanse percentage comparison</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Expense</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${totalExpense}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Income</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${totalIncome}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
