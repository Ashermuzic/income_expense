import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const NewGoal = ({ inputs, title }) => {
  const [formData, setFormData] = useState({
    goal_name: "",
    target_price: "",
    start_date: "",
    deadline_date: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the required structure
    const goalData = {
      goal_name: formData.goal_name,
      target_price: parseFloat(formData.target_price),
      start_date: formData.start_date,
      deadline_date: formData.deadline_date,
      description: formData.description,
    };

    console.log(goalData);

    axios
      .post("http://localhost:8800/goals/", goalData)
      .then((res) => {
        navigate("/goals");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>

                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [input.name]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGoal;
