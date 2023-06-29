import { Link } from "react-router-dom";
import "../App.scss";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const user = useSelector((state) => state.user.account);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>
            You don't have permission to ascess this page
          </Alert.Heading>
          <p>Please login to use this page</p>
        </Alert>
        <div className="back">
          <Link to="/" className="btn btn-outline-success ">
            <i className="fa-solid fa-circle-arrow-left mx-2"></i>
            Go back
          </Link>
          <Link to="/login" className="btn btn-outline-primary mx-4">
            <i className="fa-solid fa-right-to-bracket mx-2"></i>
            Login
          </Link>
        </div>
      </>
    );
  }
  return <>{children}</>;
};
PrivateRoutes.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoutes;
