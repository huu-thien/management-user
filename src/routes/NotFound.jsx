import {  Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
const NotFound = () => {
  return (
    <>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>
            Page not Found
          </Alert.Heading>
          <p>hmm....</p>
        </Alert>
        <div className="back">
          <Link to="/" className="btn btn-outline-primary">
            <i className="fa-solid fa-circle-arrow-left mx-2"></i>
            Go back
          </Link>
        </div>
      </>
  );
};

export default NotFound;
