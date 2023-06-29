import { toast } from "react-toastify";
import { loginApi } from "../../services/UserService";

const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

const USER_LOGOUT = "USER_LOGOUT";
const USER_REFRESH = "USER_REFRESH";

const handleLoginRedux = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_LOGIN });
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", email.trim());
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: { email: email.trim(), token: res.token },
      });
      toast.success("Login successfully !!");
    } else {
      // error
      if (res && +res.status === 400) {
        toast.error(res.data.error.toUpperCase());
      }
      dispatch({ type: FETCH_USER_ERROR });
    }
  };
};
const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

const handleRefresh = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_REFRESH,
    });
  };
};

export {
  USER_LOGOUT,
  FETCH_USER_LOGIN,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  USER_REFRESH,
  handleLoginRedux,
  handleLogoutRedux,
  handleRefresh,
};
