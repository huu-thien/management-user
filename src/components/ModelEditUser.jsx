import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { postCreateUser } from "../services/UserService";

import { toast } from "react-toastify";

const ModalEditUser = ({ show, handleClose, dataUserEdit }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = () => {

  }
  useEffect(() => {
    if(show) {
      setName(dataUserEdit.first_name)
    }
  }, [dataUserEdit])
  console.log("check props: " , dataUserEdit);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                value={job}
                onChange={(e) => setJob(e.target.value)}
                type="text"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalEditUser.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  dataUserEdit: PropTypes.object
};
export default ModalEditUser;
