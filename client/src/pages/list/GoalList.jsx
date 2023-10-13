import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Goal from "../../components/main/Goal/Goal";

const GoalList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Goal />
      </div>
    </div>
  );
};

export default GoalList;
