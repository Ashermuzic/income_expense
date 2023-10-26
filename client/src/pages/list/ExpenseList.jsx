import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ExpenseTable from "../../components/datatable/ExpenseTable";

const ExpenseList = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  return isAuthenticated ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ExpenseTable />
      </div>
    </div>
  ) : null;
};

export default ExpenseList;
