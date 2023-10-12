import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Tool from "../../components/main/Tool/Tool";

const ToolList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Tool />
      </div>
    </div>
  );
};

export default ToolList;
