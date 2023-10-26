import React, { useEffect, useState } from "react";
import "./profile.scss";
import girl from "../../../assets/img/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

function Profile() {
  const [user, setUser] = useState([]);
  const [info, setInfo] = useState([]);
  const [showAdd, setShowAdd] = useState(true);
  const [value, setValue] = useState({
    info_title: "",
    info_content: "",
  });

  const toggle = () => {
    setShowAdd(!showAdd);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/auth")
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8800/legal")
      .then((res) => {
        if (res.status == 200) {
          setInfo(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (InfoId) => {
    axios
      .delete(`http://localhost:8800/legal/${InfoId}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddInfo = () => {
    axios
      .post("http://localhost:8800/legal", value)
      .then((res) => {
        // Update the state with the newly added category
        setInfo([...info, res.data]);

        // Clear the input field
        setValue({ info_title: "", info_content: "" });
        window.location.reload(true);
      })
      .catch((err) => {
        console.error("Error adding category:", err);
      });
  };

  return (
    <div className="profile">
      {user.map((user) => {
        return (
          <div className="top">
            <div className="t-left">
              <img src={girl} alt="" />
            </div>
            <div className="t-right">
              <div className="pro-title">{user.username}</div>
              <div className="pro-detail">
                Role: <p className="role">{user.role}</p>
              </div>
              <div className="pro-detail">
                Company Name: <p className="company">{user.company_name}</p>
              </div>
              <div className="pro-detail">
                Phone: <p>{user.phone}</p>
              </div>
              <div className="pro-detail">
                Email: <p>{user.email}</p>
              </div>
              <div className="pro-detail">
                Address: <p>{user.address}</p>
              </div>
              <Link
                to={`/profile/edit/${user.user_id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="pro-edit">Edit</div>
              </Link>
            </div>
          </div>
        );
      })}
      <div className="bottom">
        <div className="bottom-title">
          <div className="b-title">Legal Information</div>
          <div className="b-link" onClick={toggle}>
            Add Info
          </div>
        </div>
        <div className={`add-info ${showAdd ? "add-toggle" : ""}`}>
          <input
            type="text"
            placeholder="Add title here"
            value={value.info_title}
            onChange={(e) => setValue({ ...value, info_title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Add detail here"
            value={value.info_content}
            onChange={(e) =>
              setValue({ ...value, info_content: e.target.value })
            }
          />
          <AddIcon
            className="info-add"
            onClick={() => {
              handleAddInfo();
              toggle();
            }}
          />
        </div>
        {info.map((info) => {
          return (
            <div className="b-detail">
              <div className="content-titles">
                {info.info_title}: <p className="role">{info.info_content}</p>
              </div>
              <div className="d-icon">
                <ClearIcon onClick={() => handleDelete(info.info_id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
