import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteItem2(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteItem2 = () => {
    handleClose();
     props.deleteItem2(props.id, props.columnId);
  };

  return (
    <>
      <div
        className="list4"
        onClick={() => {
          handleShow();
        }}
      >
        <AiOutlineDelete className="icons" /> Delete from project
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
          Are you sure you want to delete this item from this project?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={deleteItem2}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteItem2;
