import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react"; // Import useEffect
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to fetch notification count
  const fetchNotificationCount = () => {
    axios
      .get("http://localhost:8800/products/count") // Update the endpoint URL
      .then((res) => {
        setNotificationCount(res.data.count); // Update the notification count
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Fetch notification count when the component mounts
    fetchNotificationCount();

    // Set up an interval to periodically fetch the notification count (e.g., every 1 minute)
    const interval = setInterval(() => {
      fetchNotificationCount();
    }, 60000); // Fetch every 1 minute (adjust as needed)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <Link to="/notifications" style={{ color: "#555" }}>
            <div className="item">
              <NotificationsNoneOutlinedIcon className="icon" />
              <div className="counter">{notificationCount}</div>
            </div>
          </Link>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div>{moment().format("YYYY-MM-DD")}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
