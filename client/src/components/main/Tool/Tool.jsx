import React from "react";
import "./tool.scss";
import ReactCalender from "./calender/ReactCalender";
import ReactCalculator from "./calculator/ReactCalculator";

function Tool() {
  return (
    <div className="tool">
      <div className="toolTitle">Tools</div>
      <div className="toolsContainer">
        <ReactCalender />
        <ReactCalculator />
      </div>
    </div>
  );
}

export default Tool;
