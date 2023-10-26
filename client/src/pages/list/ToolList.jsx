import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Tool from "../../components/main/Tool/Tool";

const ToolList = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  return isAuthenticated ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Tool />
      </div>
    </div>
  ) : null;
};

export default ToolList;
