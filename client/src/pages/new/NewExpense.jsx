import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const NewExpense = ({ inputs, title }) => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  const [formData, setFormData] = useState({
    expense_name: "",
    amount: "",
    price: "",
    description: "",
    date: "",
    expense_category: "",
    provider_name: "",
    provider_info: "",
    file: null, // To store the selected file
  });

  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/expense/cat")
      .then((res) => {
        if (res.status === 200) {
          setExpenses(res.data);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const expenseData = new FormData();
    expenseData.append("expense_name", formData.expense_name);
    expenseData.append("amount", parseInt(formData.amount));
    expenseData.append("price", parseFloat(formData.price));
    expenseData.append("description", formData.description);
    expenseData.append("date", moment().format("YYYY-MM-DD HH:mm:ss"));
    expenseData.append("expense_category", formData.expense_category);
    expenseData.append("provider_name", formData.provider_name);
    expenseData.append("provider_info", formData.provider_info);

    // Append the file to FormData if a file is selected
    if (formData.file) {
      expenseData.append("file", formData.file);
    }

    axios
      .post("http://localhost:8800/expense/", expenseData)
      .then((res) => {
        navigate("/expenses");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isAuthenticated ? (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="dropDown">
            <select
              name="expense_category"
              value={formData.expense_category}
              onChange={handleInputChange}
            >
              <option value="">Select expense type</option>
              {expenses.map((expense) => (
                <option key={expense.category_id} value={expense.category_id}>
                  {expense.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="right">
            <form onSubmit={handleFormSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "file" ? (
                    <input
                      type={input.type}
                      name={input.name}
                      onChange={handleFileChange}
                    />
                  ) : (
                    <input
                      type={input.type}
                      name={input.name}
                      value={formData[input.name]}
                      placeholder={input.placeholder}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default NewExpense;
