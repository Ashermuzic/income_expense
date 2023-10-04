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
import { Link, useLocation } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation();

  // Define a function to check if a given path matches the current route
  const isActive = (path) => {
    return location.pathname === path;
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
          <li
            style={{
              background: isActive("/expense") ? "#9385db38" : "",
            }}
          >
            <ReceiptOutlinedIcon className="icon" />
            <span>Expense</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <HistoryOutlinedIcon className="icon" />
            <span>History</span>
          </li>
          <li>
            <FlagOutlinedIcon className="icon" />
            <span>Goals</span>
          </li>
          <li>
            <BuildOutlinedIcon className="icon" />
            <span>Tools</span>
          </li>
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
          <p className="title">PREFERENCES</p>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
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
