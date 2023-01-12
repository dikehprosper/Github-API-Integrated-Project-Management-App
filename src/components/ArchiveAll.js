import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineArchive } from "react-icons/hi";

function ArchiveAll(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const archiveItem2 = () => {
    handleClose();
     props.archiveItem2(props.columnId);
  };

  return (
    <>
      <div
      className="list12"
        onClick={() => {
            props.onClick3();
          handleShow();
        }}
      >
        <HiOutlineArchive className="icons" /> Archive All
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Archive All Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.count === 1 ? ( <div>Are you sure you want to archive {props.count} item from {props.name}</div> ) :(  
                <div><div>Are you sure you want to archive all {props.count} items from {props.name}</div></div>
            )}
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={archiveItem2}>Archive</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ArchiveAll;
