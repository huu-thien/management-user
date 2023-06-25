import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";

const ModalAddNew = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = () => {
    console.log({ name, job });
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nguyen Huu Thien"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                value={job}
                onChange={(e) => setJob(e.target.value)}
                type="text"
                placeholder="Fullstack developer"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalAddNew.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};
export default ModalAddNew;
