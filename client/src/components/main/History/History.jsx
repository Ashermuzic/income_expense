import React, { useContext, useEffect, useState } from "react";
import "./history.scss";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { DarkModeContext } from "../../../context/darkModeContext";
import axios from "axios";
import {
  incomeHistoryColumns,
  expenseHistoryColumns,
} from "../../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function History() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/incomes")
      .then((res) => {
        if (res.status === 200) {
          setIncomeData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8800/expense")
      .then((res) => {
        if (res.status === 200) {
          setExpenseData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const incomeAction = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/incomes/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewIncomeButton">View Detail</div>
            </Link>
          </div>
        );
      },
    },
  ];

  const expenseAction = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/expenses/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewExpenseButton">View Detail</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="history">
      <div className="historyTitle">History</div>
      <div className="historyBody">
        <div className="left">
          <div className="leftTitle">Income History</div>
          <div className="leftBody">
            <DataGrid
              className="datagrid"
              rows={incomeData}
              columns={incomeHistoryColumns.concat(incomeAction)}
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>
        </div>
        <div className="right">
          <div className="rightTitle">Expense History</div>
          <div className="rightBody">
            <DataGrid
              className="datagrid"
              rows={expenseData}
              columns={expenseHistoryColumns.concat(expenseAction)}
              pageSize={9}
              rowsPerPageOptions={[9]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
