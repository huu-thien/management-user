import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import Alert from "react-bootstrap/Alert";

const PrivateRoutes = ({ children, path }) => {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>
          You don't have permission to ascess this page
        </Alert.Heading>
        <p>Please login to use this page</p>
      </Alert>
    );
  }
  return <>{children}</>;
};

export default PrivateRoutes;
