import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import Category from "../../components/main/Category/Category";

const CategoryList = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  return isAuthenticated ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Category />
      </div>
    </div>
  ) : null;
};

export default CategoryList;
