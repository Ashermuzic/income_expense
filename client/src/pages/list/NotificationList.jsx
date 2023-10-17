import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Notification from "../../components/main/Notification/Notification";

const NotificationList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Notification />
      </div>
    </div>
  );
};

export default NotificationList;
