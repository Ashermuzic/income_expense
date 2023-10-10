import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ExpenseTable from "../../components/datatable/ExpenseTable";

const ExpenseList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ExpenseTable />
      </div>
    </div>
  );
};

export default ExpenseList;
