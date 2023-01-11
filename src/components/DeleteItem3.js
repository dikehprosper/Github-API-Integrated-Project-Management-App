import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteItem(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteItem3(){
    handleClose();
props.deleteItem3(props.columnId, props.id)
  }

  return (
    <>
      <div
        className="list4"
        onClick={() => {
         // props.onClick();
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
        Are you sure you want to delete this item from this project?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={deleteItem3}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteItem;
