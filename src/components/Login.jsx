import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const { loginContext } = useContext(UserContext);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoadingApi(true);
    let res = await loginApi(email.trim(), password);
    console.log(res);
    if (res && res.token) {
      navigate("/users");
      loginContext(email.trim(), res.token);
      toast.success("Log in successfully !!");
    } else {
      // error
      if (res && +res.status === 400) {
        toast.error(res.data.error.toUpperCase());
      }
    }
    setLoadingApi(false);
  };
  const handlePressEnter = async (e) => {
    if (+e.keyCode === 13) {
      await handleLogin();
    }
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">
        <strong>LOG IN</strong>
      </div>
      <div className="text my-2">
        <strong>Email or username : eve.holt@reqres.in</strong>
      </div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email or username.."
      />
      <div className="input-block">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isShowPass ? "text" : "password"}
          placeholder="Password..."
          onKeyDown={(e) => handlePressEnter(e)}
        />
        <i
          className={isShowPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
          onClick={() => setIsShowPass(!isShowPass)}
        ></i>
      </div>
      <button
        className={email && password && "active"}
        disabled={!(email && password)}
        onClick={handleLogin}
      >
        {loadingApi && <i className="fa-solid fa-sync fa-spin mx-2"></i>}
        Log in
      </button>
      <div className="back">
        <Link to="/" className="btn btn-outline-primary">
          <i className="fa-solid fa-circle-arrow-left mx-2"></i>
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Login;
