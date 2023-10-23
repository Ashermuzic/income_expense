import "./login.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8800/auth", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          // Save the username to localStorage
          localStorage.setItem("username", username);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Incorrect username or password");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="login pd">
      <div className="loginNavbar">
        <div className="l-title">Creative Finance</div>
      </div>
      <div className="loginBody">
        <div className="b-illustration"></div>
        <div className="b-form">
          <div className="form-title">
            <div>Welcome Back!</div>
            <p>Login to continue</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="inputBox">
              <PersonOutlineIcon className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="inputBox">
              <VpnKeyIcon className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="error">
                <p>{error}</p>
              </div>
            )}

            <div className="btn-box">
              <button type="submit">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
      <div className="loginFooter">
        <div className="l-footer-detail">
          Developed by
          <a target="_blank" href="https://t.me/ashermuzic">
            Asher
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
