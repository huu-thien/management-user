import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import PropTypes from "prop-types";
import { postCreateUser } from "../services/UserService";

import { toast } from "react-toastify";

const ModalConfirmRemove = ({ show, handleClose, dataUserRemove }) => {
  const confirmDelete = () => {};
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            Are you sure remove this user ?
            <br />
            <strong>ID: {dataUserRemove.id}</strong>
            <br />
            <strong>Name: {dataUserRemove.first_name}</strong>
            <br />
            <strong>Email: {dataUserRemove.email}</strong>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-danger"
            onClick={() => confirmDelete()}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ModalConfirmRemove.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  dataUserRemove: PropTypes.object,
};
export default ModalConfirmRemove;
