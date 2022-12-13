import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteItem(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="list4"
        onClick={() => {
          props.onClick();
          handleShow();
        }}
      >
        <AiOutlineDelete className="icons" /> Delete
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.id === 3 ? (
            <>
              {" "}
              This will delete the "Status" option
              <span className="bold">"{props.name}"</span>. This update will
              remove the option used in 2 workflows. Continuing will disable the
              workflows, and invalidate the actions containing this option.
            </>
          ) : (
            <>
              This will delete the "Status" option
              <span className="bold">"{props.name}"</span>.
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={props.DeleteItem}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteItem;
