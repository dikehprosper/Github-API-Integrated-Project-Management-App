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
import { DragDropContext } from "react-beautiful-dnd";

function Column(props) {
  const [name, setName] = useState(props.name);
  const [issue, setIssue] = useState([]);
  const count = props.issue.filter((issue) => issue.isArchived === false).length;

  
  /* function newIssue(valueCollected) {
    const newIssue = {
      pick: false,
      id: nanoid(),
      selection: false,
      tables: valueCollected,
      selection2: false,
      shownRepositories: true,
    };

    setIssue([...issue, newIssue]);
  } */


 
 
/*   function deleteItem2(id, columnId) {
    if (columnId === props.id) {
      setIssue(issue.filter((item) => id !== item.id));
    }
  } */

/*   function section(id) {
    const handleAll = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, selection: true };
      }
      return { ...issue };
    });
    setIssue(handleAll);
  } */

 /*  function section2(id, pick) {
    const handleAll = issue.map((issue) => {
      if (id === issue.id && pick === true) {
        return { ...issue, selection: true, pick: true };
      } else if (id === issue.id && pick === false) {
        return { ...issue, selection: false, pick: false };
      }
      return { ...issue };
    });
    setIssue(handleAll);
  } */




/*   let menuRef3 = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef3.current.contains(e.target)) {
        closeAll3();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }); 





   function closeAll3() {
    const handleAllShow = issue.map((issue) => {
      return { ...issue, pick: false, selection: false };
    });
    setIssue(handleAllShow);
  } 

   function closeAll2(id) {
    const handleAll = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, selection: true, pick: false };
      }
      return { ...issue, selection: false, pick: false };
    });
    setIssue(handleAll);
  }  */
/* 
  function dropItem2(id) {
    const handleAllShow = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, pick: !issue.pick };
      }
      return { ...issue, selection: false, pick: false };
    });
    setIssue(handleAllShow);
  } */

  const style4 = {
    display: props.highlight ? "flex" : "none",
  };

  const style5 = {
    cursor: count === 0 ? "not-allowed" : "pointer",
    color: count === 0 ? "grey" : "white",
    onmouseover: count === 0? "transparent" : "grey",
    PointerEvent: count === 0? "none" : "all",
    background: count === 0? "" : "rgba(128, 128, 128, 0.411)"
  };

  const style6 = {
    cursor: count === 0 ? "not-allowed" : "pointer",
    color: count === 0 ? "grey" : "white",
    onmouseover: count === 0? "transparent" : "grey",
    PointerEvent: count === 0? "none" : "all",
  };

  const style7 = {
    background: count === 0? "rgba(128, 128, 128, 0.411)" : ""
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



 



  return   props.show ? (
    <div style={style1}>
      <div className="new-column">
        <div className="new-column1">
          <div className="new-column2">
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
            <div className="count"  onClick={props.closeAll} >
              {count}
            </div>
          </div>
          <div className="middle"  onClick={props.closeAll} ></div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick}  ref={props.menuRef}>
              ...
            
            <div className="list-drop-down" style={style2}  >
              <div className="list-drop-down2">
              <div className="list30">Item actions</div>
                <div className="list1" style={style5}>
                  {" "}
                  <ArchiveAll
                  name={props.name}
                  columnId={props.id}
                  onClick={props.onClick}
                  archiveItem2={props.archiveItem2}
                  id={props.id}
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
        </div>
        <div className="main-section">
          <div>
          <Droppable droppableId={`${props.id}`}>
              {(droppableProvided) => (
                <div ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}> 
                <div ref={props.menuRef3}>
                  {props.issue.map((issue, index) => {
                    return (
                      <Issues
                        key={issue.id}
                        {...issue}
                        index={index}
                        columnId={props.id}
                        dropItem2={props.dropItem2}
                        section={props.section}
                        section2={props.section2}
                        menuRef={props.menuRef3}
                        closeAll={props.closeAll3}
                        closeAll2={props.closeAll2}
                        deleteItem2={props.deleteItem2}
                        userName={props.userName}
                        apiKey={props.apiKey}
                        showRepositories={props.showRepositories}
                        changeIssueCreatedState ={props.changeIssueCreatedState}
                        archiveItem={props.archiveItem}
                        onClick3={props.onClick3}
                      />
                    );
                  })}
                  </div>
              </div>
              )}
              
            </Droppable> 
            <div className="issues" style={style4}></div>
          </div>
          <div className="main-section2" onClick={props.closeAll}></div>
        </div>
        <div className="add-item" onClick={openInput}>
          {" "}
          <span className="add-item1"> + </span>
          <div className="add-item2">&nbsp; Add item </div>{" "}
        </div>
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
  ) : (
    <div style={style1}>
    {/*   <button style={{ position: 'sticky', left: '0'  }}>View Archived Items</button> */}
      <div className="new-column">
        <div className="new-column1">
          <div className="new-column2">
            <div className="rename" onClick={handleShow}>
              {props.name} &nbsp;
            </div>
            <div className="count" onClick={props.closeAll}>
              {count}
            </div>
          </div>
          <div className="middle"  onClick={props.closeAll}></div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick} >
              ...
              </div>
            <div className="list-drop-down" style={style2} >
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
        <div className="main-section"  >
          <div >
            <Droppable droppableId={`${props.id}`}>
              {(droppableProvided,droppableSnapshot) => (
                <div ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}> 
                <div ref={props.menuRef3}>
                  {props.issue.map((issue, index) => {
                    return (
                      <Issues
                        key={issue.id}
                        {...issue}
                        index={index}
                        columnId={props.id}
                        dropItem2={props.dropItem2}
                        section={props.section}
                        section2={props.section2}
                        menuRef={props.menuRef3}
                        closeAll={props.closeAll3}
                        closeAll2={props.closeAll2}
                        deleteItem2={props.deleteItem2}
                        userName={props.userName}
                        apiKey={props.apiKey}
                        showRepositories={props.showRepositories}
                        changeIssueCreatedState={props.changeIssueCreatedState}
                        archiveItem={props.archiveItem}
                        onClick3={props.onClick3}
                      />
                    );
                  })}
                  </div>
              </div>
              )}
              
            </Droppable> 
            <div className="issues" style={style4}></div>
          </div>
          {/* <div className="main-section2" onClick={props.closeAll}></div> */}
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
  )
    

}
export default Column;
