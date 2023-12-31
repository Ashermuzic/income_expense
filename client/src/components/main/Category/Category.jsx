import React, { useContext, useEffect, useState } from "react";
import "./category.scss";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { DarkModeContext } from "../../../context/darkModeContext";
import axios from "axios";

function Category() {
  const [data, setData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [value, setValue] = useState({
    name: "",
  });
  const [expenseValue, setExpenseValue] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8800/categories")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });

    axios
      .get("http://localhost:8800/expenseCategories")
      .then((res) => {
        setExpenseData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleAddCategory = () => {
    axios
      .post("http://localhost:8800/categories", {
        category_name: value.name,
      })
      .then((res) => {
        // Update the state with the newly added category
        setData([...data, res.data]);

        // Clear the input field
        setValue({ name: "" });
      })
      .catch((err) => {
        console.error("Error adding category:", err);
      });
  };

  const handleAddExpenseCategory = () => {
    axios
      .post("http://localhost:8800/expenseCategories", {
        category_name: expenseValue.name,
      })
      .then((res) => {
        // Update the state with the newly added category
        setExpenseData([...expenseData, res.data]);

        // Clear the input field
        setExpenseValue({ name: "" });
      })
      .catch((err) => {
        console.error("Error adding category:", err);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    axios
      .delete(`http://localhost:8800/categories/${categoryId}`)
      .then(() => {
        // Update the state with a function that uses the previous state
        setData((prevData) => {
          return prevData.filter(
            (category) => category.category_id !== categoryId
          );
        });
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };

  const handleDeleteExpenseCategory = (categoryId) => {
    axios
      .delete(`http://localhost:8800/expenseCategories/${categoryId}`)
      .then(() => {
        // Update the state with a function that uses the previous state
        setExpenseData((prevData) => {
          return prevData.filter(
            (category) => category.category_id !== categoryId
          );
        });
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };

  return (
    <div className="category">
      <div className="categoryTitle">View All Categories</div>

      <div className="categoryBody">
        <div className="lists">
          {data.map((category) => {
            return (
              <div className="singleCategory">
                {category.category_name}
                <ClearIcon
                  className="icon"
                  onClick={() => handleDeleteCategory(category.category_id)}
                />
              </div>
            );
          })}
        </div>

        <div className="addCategory">
          <div className="box">
            <input
              type="text"
              placeholder="add income category"
              value={value.name}
              onChange={(e) => setValue({ name: e.target.value })}
            />
            <AddIcon className="icon" onClick={handleAddCategory} />
          </div>
        </div>
      </div>

      <hr className="line" />

      <div className="categoryBody">
        <div className="lists">
          {expenseData.map((category) => {
            return (
              <div className="singleCategory">
                {category.category_name}
                <ClearIcon
                  className="icon"
                  onClick={() =>
                    handleDeleteExpenseCategory(category.category_id)
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="addCategory">
          <div className="box">
            <input
              type="text"
              placeholder="add expense category"
              value={expenseValue.name}
              onChange={(e) => setExpenseValue({ name: e.target.value })}
            />
            <AddIcon className="icon" onClick={handleAddExpenseCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
