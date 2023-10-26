import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import IncomeTable from "../../components/datatable/IncomeTable";

const IncomeList = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  return isAuthenticated ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <IncomeTable />
      </div>
    </div>
  ) : null;
};

export default IncomeList;
