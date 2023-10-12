import React from "react";
import "./tool.scss";
import ReactCalender from "./calender/ReactCalender";

function Tool() {
  return (
    <div className="tool">
      <div className="toolTitle">Tools</div>
      <div className="toolsContainer">
        <ReactCalender />
      </div>
    </div>
  );
}

export default Tool;
