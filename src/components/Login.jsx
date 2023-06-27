import { useEffect, useState, useContext } from "react";
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
      navigate("/");
      loginContext(email.trim(), res.token);
      toast.success("Log in successfully !!");
    } else {
      // error
      if (res && +res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">
        <strong>Log in</strong>
      </div>
      <div className="text">
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
        <i className="fa-solid fa-circle-arrow-left mx-2"></i>
        <Link to="/" className="back-text">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default Login;
