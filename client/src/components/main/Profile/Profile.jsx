import React, { useEffect, useState } from "react";
import "./profile.scss";
import girl from "../../../assets/img/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState([]);

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
        <div className="b-title">Legal Information</div>
        <div className="b-detail">
          Company Name: <p className="role">XY Corporation</p>
        </div>
        <div className="b-detail">
          Date of Legalization: <p>2016 - 07 -11</p>
        </div>
        <div className="b-detail">
          Business Address: <p>Debreziet Ethiopia / near the ABC building</p>
        </div>
        <div className="b-detail">
          Type of Business Entity: <p>Sole Proprietorship</p>
        </div>
        <div className="b-detail">
          Certified by: <p>Ethiopian quality assessment</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
