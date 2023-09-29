import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import Category from "../../components/main/Category/Category";

const CategoryList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Category />
      </div>
    </div>
  );
};

export default CategoryList;
