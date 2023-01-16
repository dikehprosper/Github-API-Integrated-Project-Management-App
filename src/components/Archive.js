import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineArchive } from "react-icons/hi";

function Archive(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const archiveItem = () => {
    handleClose();
     props.archiveItem(props.id, props.columnId);
  };

 

  return (
    <>
      <div
        className="list2"
        onClick={() => {
            props.onClick3();
          handleShow();
        }}
      >
        <HiOutlineArchive className="icons" /> Archive
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Archive Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to archive this item?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={archiveItem}>Archive</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Archive;
