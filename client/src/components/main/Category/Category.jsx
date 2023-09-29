import React, { useContext } from "react";
import "./category.scss";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import { DarkModeContext } from "../../../context/darkModeContext";

function Category() {
  const datas = [
    {
      id: 1,
      name: "Food",
    },
    {
      id: 2,
      name: "Clothing",
    },
    {
      id: 3,
      name: "Electronic",
    },
    {
      id: 4,
      name: "Educational",
    },
    {
      id: 5,
      name: "Fashion",
    },
    {
      id: 6,
      name: "Books",
    },
    {
      id: 7,
      name: "Food",
    },
    {
      id: 5,
      name: "Fashion",
    },
    {
      id: 6,
      name: "Books",
    },
    {
      id: 4,
      name: "Educational",
    },
    {
      id: 5,
      name: "Fashion",
    },
  ];

  return (
    <div className="category">
      <div className="categoryTitle">View All Categories</div>
      <div className="categoryBody">
        <div className="lists">
          {datas.map((data) => {
            return (
              <div className="singleCategory">
                {data.name}
                <ExitToAppIcon className="icon" />
              </div>
            );
          })}
        </div>

        <div className="addCategory">
          <div className="box">
            <input type="text" placeholder="add category" />
            <AddIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
