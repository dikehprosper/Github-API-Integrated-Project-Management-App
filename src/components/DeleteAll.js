import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";

function DeleteAll(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAllItem = () => {
    handleClose();
     props.deleteAllItem(props.id, props.columnId);
  };

  return (
    <>
      <div
        onClick={() => {
          props.onClick();
          handleShow();
        }}
      >
        <AiOutlineDelete className="icons" /> Delete All
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
        {props.count === 1 ? ( <div>Are you sure you want to delete {props.count} item from {props.name}</div> ) :(  
                <div><div>Are you sure you want to delete all {props.count} items from {props.name}</div></div>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={deleteAllItem}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteAll;
