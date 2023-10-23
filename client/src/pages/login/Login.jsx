import "./login.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Login = () => {
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

          <form action="">
            <div className="inputBox">
              <PersonOutlineIcon className="icon" />
              <input type="text" name="" id="" placeholder="Enter Username" />
            </div>

            <div className="inputBox">
              <VpnKeyIcon className="icon" />
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
              />
            </div>
          </form>
          <div className="btn-box">
            <button>LOGIN</button>
          </div>
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
