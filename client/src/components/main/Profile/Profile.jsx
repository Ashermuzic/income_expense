import React from "react";
import "./profile.scss";
import girl from "../../../assets/img/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";

function Profile() {
  return (
    <div className="profile">
      <div className="top">
        <div className="t-left">
          <img src={girl} alt="" />
        </div>
        <div className="t-right">
          <div className="pro-title">Anatoly kobert</div>
          <div className="pro-detail">
            Role: <p className="role">Owner</p>
          </div>
          <div className="pro-detail">
            Company Name: <p className="company">XY Corporation</p>
          </div>
          <div className="pro-detail">
            Phone: <p>+251 900 269 094</p>
          </div>
          <div className="pro-detail">
            Email: <p>ashersam116@gamil.com</p>
          </div>
          <div className="pro-detail">
            Address: <p>Debreziet Ethiopia</p>
          </div>
        </div>
      </div>
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
