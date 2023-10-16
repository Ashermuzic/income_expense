import React, { useEffect, useState } from "react";
import "./goal.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgressbar } from "react-circular-progressbar";
import axios from "axios";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Goal() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/goals")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting goal with ID:", id);

    axios
      .delete(`http://localhost:8800/goals/${id}`)
      .then((res) => {
        console.log("Delete request successful");
        if (res.status === 200) {
          window.location.reload(true);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("Error deleting goal:", err);
      });
  };

  return (
    <div className="goal">
      <div className="goalTitle">
        Goal
        <Link to="/goals/new" className="link">
          Add New
        </Link>
      </div>

      <div className="goalCards">
        {data.map((goal) => {
          return (
            <div className="goalCard" key={goal.id}>
              <div className="mainInfo">
                <div className="goal_name">
                  <p>{goal.goal_name}</p>
                </div>
                <div className="target">
                  Target Price: <p>{goal.target_price}</p>
                </div>
              </div>
              <div className="date">
                <div>Start date: {formatDate(goal.start_date)}</div>
                <div>End date: {formatDate(goal.deadline_date)}</div>
              </div>
              <div className="desc">{goal.description}</div>
              <div className="progress">
                <div className="circle">
                  <CircularProgressbar
                    value={70}
                    text={"70%"}
                    strokeWidth={5}
                  />
                </div>
              </div>
              <div className="icon" onClick={() => handleDelete(goal.goal_id)}>
                <DeleteIcon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Goal;
