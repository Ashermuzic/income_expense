import "./single.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SingleExpense = () => {
  const [data, setData] = useState({
    expense_name: "",
    amount: "",
    price: "",
    description: "",
    category_name: "",
    date: "",
    provider_name: "",
    provider_info: "",
    attachment_name: "",
  });

  const { expenseId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/expense/${expenseId}`)
      .then((res) => {
        if (res.status === 200) {
          setData({
            ...data,
            expense_name: res.data[0].expense_name,
            amount: res.data[0].amount,
            price: res.data[0].price,
            description: res.data[0].description,
            category_name: res.data[0].category_name,
            date: res.data[0].date,
            provider_name: res.data[0].provider_name,
            provider_info: res.data[0].provider_info,
            attachment_name: res.data[0].attachment_name,
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
                to={`/expenses/edit/${expenseId}`}
              >
                Edit
              </Link>
            </div>

            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.expense_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Amount:</span>
                  <span className="itemValue">{data.amount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.price}</span>
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
                <div className="detailItem">
                  <span className="itemKey">Provider Name:</span>
                  <span className="itemValue">{data.provider_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Provider Info:</span>
                  <span className="itemValue">{data.provider_info}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Attachment Name</span>
                  <span className="itemValue">{data.attachment_name}</span>
                </div>
                <div className="attachedFiles">
                  <div className="attachedTitle">Attached File</div>
                  <a
                    href={`http://localhost:8800/attachments/${data.attachment_name}`}
                    download
                  >
                    <div className="attachedDownload">
                      <CloudDownloadIcon />
                    </div>
                  </a>
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
  );
};

export default SingleExpense;
