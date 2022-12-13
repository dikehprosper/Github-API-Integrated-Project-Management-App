import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";


function DeleteItem2(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

/*   function deleteSpecificItem(id) {
    const deleteSpecificItem = columns.filter((column) => id !== column.id);

    setColumns(deleteSpecificItem);
  }

  function DropItem(id) {
    onClick2();
    closeInput();
    setColumns((column) =>
      column.map((column) => {
        return id === column.id
          ? {
              ...column,
              pick: !column.pick,
              highlight: false,
              show: false,
              called: false,
            }
          : {
              ...column,
              show: false,
              pick: false,
              highlight: false,
              called: false,
            };
      })
    );
  } */

  return (
    <>
      <div
        className="list4"
        onClick={() => {
          props.onClick();
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
          <Button onClick={props.DeleteItem}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteItem2;
