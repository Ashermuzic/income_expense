import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import IncomeTable from "../../components/datatable/IncomeTable";

const IncomeList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <IncomeTable />
      </div>
    </div>
  );
};

export default IncomeList;
