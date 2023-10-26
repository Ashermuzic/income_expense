import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import MoneyOffOutlinedIcon from "@mui/icons-material/MoneyOffOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation();

  // Define a function to check if a given path matches the current route
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the "username" item from localStorage
    localStorage.removeItem("username");
    // Redirect the user to the login page or wherever you want
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/dashboard") ? "#9385db38" : "",
              }}
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/products") ? "#9385db38" : "",
              }}
            >
              <LocalMallOutlinedIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/incomes" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/incomes") ? "#9385db38" : "",
              }}
            >
              <MonetizationOnOutlinedIcon className="icon" />
              <span>Income</span>
            </li>
          </Link>
          <Link to="/expenses" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/expenses") ? "#9385db38" : "",
              }}
            >
              <ReceiptOutlinedIcon className="icon" />
              <span>Expense</span>
            </li>
          </Link>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <Link to="/goals" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/goals") ? "#9385db38" : "",
              }}
            >
              <FlagOutlinedIcon className="icon" />
              <span>Goals</span>
            </li>
          </Link>
          <Link to="/tools" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/tools") ? "#9385db38" : "",
              }}
            >
              <BuildOutlinedIcon className="icon" />
              <span>Tools</span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/category") ? "#9385db38" : "",
              }}
            >
              <CategoryOutlinedIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <Link to="/history" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/history") ? "#9385db38" : "",
              }}
            >
              <HistoryOutlinedIcon className="icon" />
              <span>History</span>
            </li>
          </Link>
          <p className="title">PREFERENCES</p>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li
              style={{
                background: isActive("/notifications") ? "#9385db38" : "",
              }}
            >
              <NotificationsNoneIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
