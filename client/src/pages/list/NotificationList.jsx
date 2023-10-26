import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Notification from "../../components/main/Notification/Notification";

const NotificationList = () => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  return isAuthenticated ? (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Notification />
      </div>
    </div>
  ) : null;
};

export default NotificationList;
