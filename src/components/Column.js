import React, { useEffect, useRef, useState } from "react";
import Issues from "./Issues";
import { HiOutlineArchive } from "react-icons/hi";
import { BiHide } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { nanoid } from "nanoid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ArchiveAll from "./ArchiveAll";
import DeleteAll from "./DeleteAll";

function Column(props, { menuRef1, menuRef2}) {
  const [name, setName] = useState(props.name);
  const count = props.issue.filter(
    (issue) => issue.isArchived === false
  ).length;

  const style4 = {
    display: props.highlight ? "flex" : "none",
  };

  const style5 = {
    cursor: count === 0 ? "not-allowed" : "pointer",
    color: count === 0 ? "grey" : "white",
    onmouseover: count === 0 ? "transparent" : "grey",
    PointerEvent: count === 0 ? "none" : "all",
    background: count === 0 ? "" : "rgba(128, 128, 128, 0.411)",
  };

  const style6 = {
    cursor: count === 0 ? "not-allowed" : "pointer",
    color: count === 0 ? "grey" : "white",
    onmouseover: count === 0 ? "transparent" : "grey",
    PointerEvent: count === 0 ? "none" : "all",
  };

  const style7 = {
    background: count === 0 ? "rgba(128, 128, 128, 0.411)" : "",
  };

  const handleShow = () => {
    props.handleAllShow(props.id);
  };

  const style1 = {
    display: props.select ? "grid" : "none",
  };

  const style2 = {
    display: props.pick ? "grid" : "none",
  };

  const hideColumn = () => {
    props.hideSpecificColumn(props.id);
  };

  const deleteItem = () => {
    props.deleteSpecificItem(props.id);
  };

  const openInput = () => {
    props.openInput(props.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateColumn(props.id, name);
  };

  return (
    <div style={style1}>
      <div className="new-column">
        <div className="new-column1">
          <div className="new-column2" ref={menuRef2}>
            {props.show ? (
              <>
                <div className="form-input">
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <input
                        autoComplete="off"
                        className="form-input1"
                        id="name"
                        autoFocus
                        value={name}
                        type="text"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </form>{" "}
                  &nbsp;
                </div>
              </>
            ) : (
              <>
                <div className="rename" onClick={handleShow}>
                  {props.name} &nbsp;
                </div>
              </>
            )}

            <div className="count" onClick={props.closeAll}>
              {count}
            </div>
          </div>
          <div className="middle" onClick={props.closeAll}></div>
          <div className="drop-down4" ref={props.menuRef}>
            <div className="toggle" onClick={props.onClick}>
              ...
            </div>
            <div className="list-drop-down" style={style2}>
              <div className="list-drop-down2">
                <div className="list30">Item actions</div>
                <div className="list1" style={style5}>
                  {" "}
                  <ArchiveAll
                    name={props.name}
                    onClick={props.onClick}
                    archiveItem2={props.archiveItem2}
                    id={props.id}
                    columnId={props.id}
                    onClick3={props.onClick3}
                    count={count}
                  />
                </div>
                <div className="list2" style={style6}>
                  <DeleteAll
                    name={props.name}
                    onClick={props.onClick}
                    deleteAllItem={props.deleteAllItem}
                    id={props.id}
                    columnId={props.id}
                    onClick3={props.onClick3}
                    count={count}
                  />
                </div>
              </div>
              <div className="list-drop-down3">
                <div className="list30">Column actions</div>
                <div className="list3" onClick={handleShow} style={style7}>
                  {" "}
                  <MdDriveFileRenameOutline className="icons" /> Rename
                </div>
                <div className="list3" onClick={hideColumn}>
                  {" "}
                  <BiHide className="icons" /> Hide from all
                </div>
                <DeleteItem
                  name={props.name}
                  onClick={props.onClick}
                  DeleteItem={deleteItem}
                  id={props.id}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main-section">
          <div className="container17">
            <Droppable droppableId={`${props.id}`}>
              {(droppableProvided, droppableSnapshot) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className="container17-1"
                >
                  <div className="container18">
                    {props.issue.map((issue, index) => (
                      <Draggable
                        key={issue.id}
                        draggableId={`${issue.id}`}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="container17-1"
                          >
                            <Issues
                              key={issue.id}
                              {...issue}
                              index={index}
                              columnId={props.id}
                              dropItem2={props.dropItem2}
                              section={props.section}
                              section2={props.section2}
                              closeAll={props.closeAll}
                              closeAll2={props.closeAll2}
                              deleteItem2={props.deleteItem2}
                              userName={props.userName}
                              apiKey={props.apiKey}
                              showRepositories={props.showRepositories}
                              changeIssueCreatedState={
                                props.changeIssueCreatedState
                              }
                              archiveItem={props.archiveItem}
                              onClick3={props.onClick3}
                              items={props.items}
                              postIssue={props.postIssue}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                    <div className="issues" style={style4}></div>
                  </div>
                  
                </div>
              )}
            </Droppable>
            <div className="main-section2" onClick={props.closeAll}></div>
          </div>
          
        </div>

        <div className="add-item" onClick={openInput}>
          {" "}
          <span className="add-item1"> + </span>
          <div className="add-item2">&nbsp; Add item </div>{" "}
        </div>

        <AddItem
          called={props.called}
          id={props.id}
          AddItem={props.AddItem}
          closeInput={props.closeInput}
          count={props.count}
          newIssue={props.newIssue}
        />
      </div>
    </div>
  );
}
export default Column;
