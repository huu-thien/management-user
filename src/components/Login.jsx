import { useState } from "react";
import { Link } from "react-router-dom";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">
        <strong>Log in</strong>
      </div>
      <div className="text">
        <strong>Email or username</strong>
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
        <i className={isShowPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => setIsShowPass(!isShowPass)}></i>
      </div>
      <button
        className={email && password && "active"}
        disabled={!(email && password)}
      >
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

export default login;
