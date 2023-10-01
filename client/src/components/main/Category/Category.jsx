import React, { useContext, useEffect, useState } from "react";
import "./category.scss";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { DarkModeContext } from "../../../context/darkModeContext";
import axios from "axios";

function Category() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState({
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
  }, []);

  console.log(value.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("category_name", value.name);

    console.log(formData);

    axios
      .post("http://localhost:8800/categories", formData)
      .then((res) => {
        console.log("category posted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="category">
      <div className="categoryTitle">View All Categories</div>
      <div className="categoryBody">
        <div className="lists">
          {data.map((data) => {
            return (
              <div className="singleCategory">
                {data.category_name}
                <ClearIcon className="icon" />
              </div>
            );
          })}
        </div>

        <div className="addCategory">
          <div className="box">
            <input
              type="text"
              placeholder="add category"
              onChange={(e) => {
                setValue({ name: e.target.value });
              }}
            />
            <AddIcon className="icon" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
