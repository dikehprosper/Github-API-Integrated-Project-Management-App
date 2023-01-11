import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";

function RestoreArchive(props) {
  const [show, setShow] = useState(false);

  function unArchiveItem() {
    handleClose();
     props.unArchiveItem( props.columnId, props.id)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        className="list6"
        onClick={() => {
          //props.onClick();
          handleShow();
        }}
      >
        <AiOutlineDelete className="icons" /> Restore
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Restore Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to restore this item?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={unArchiveItem}>Restore</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default RestoreArchive;
