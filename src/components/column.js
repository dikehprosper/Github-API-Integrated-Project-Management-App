import React, { useEffect, useRef, useState } from "react";
import Issues from "./Issues";
import { HiOutlineArchive } from "react-icons/hi";
import { BiHide } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { nanoid } from "nanoid";
import { Draggable, Droppable } from "react-beautiful-dnd";


function Column(props) {
  const [name, setName] = useState(props.name);
  const [issue, setIssue] = useState([]);

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


  const count = props.issue.length;

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
    cursor: props.tables === "" ? "not-allowed" : "pointer",
    color: props.tables === "" ? "grey" : "white",
    onMouseOver: props.tables === "" ? "transparent" : "grey",
    PointerEvent: props.tables === "" ? "none" : "all",
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


  const reorderIssueList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol);
   const [removed] = newTaskIds.splice(startIndex, 1);
   newTaskIds.splice(endIndex, 0, removed);
   console.log(newTaskIds)
  
     const newIssue = {
    ...sourceCol,
    id: newTaskIds,
   };  

   return newIssue;
  };
  
  const onDragEnd = (result) => {
    const { destination, source } = result;

          //if users tries to drop in an unknown destination
          if (!destination) return;

          //if the user drags and drops back in the same position
          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }

    //if the user drops within the same column but same position

    const sourceCol = issue[source.droppableId];
    const destinationCol = issue[destination.droppableId]

    if(sourceCol.id === destinationCol.id){
      const newIssue = reorderIssueList(
        sourceCol,
        source.index,
        destination.index
      )

          const newState = {
        ...issue,
        [newIssue.id]: newIssue
      }    

     // 
      setIssue(newState);
      return;
    };
    //if the user moves from one column to another


  
  
  };



  return    props.show ? (
    <div style={style1}>
      <div className="new-column">
        <div className="new-column1">
          <div className="new-column2">
            <div className="form-input">
              <form onSubmit={handleSubmit}>
                <div className="">
                  <input
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
            <div className="count" /* onClick={props.closeAll} */>
              {count}
            </div>
          </div>
          <div className="middle" /* onClick={props.closeAll} */></div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick}  ref={props.menuRef}>
              ...
            
            <div className="list-drop-down" style={style2}  >
              <div className="list-drop-down2">
                <div className="list1" onClick={handleShow}>
                  {" "}
                  <MdDriveFileRenameOutline className="icons" /> Rename
                </div>
                <div className="list2">
                  {" "}
                  <HiOutlineArchive className="icons" style={style5} /> Archive
                  all cards
                </div>
              </div>
              <div className="list-drop-down3">
                <div className="list3" onClick={hideColumn}>
                  {" "}
                  <BiHide className="icons" /> Hide Column
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
                <div ref={droppableProvided.innerRef} onDragEnd={onDragEnd}
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
                      //  menuRef={props.menuRef3}
                        closeAll={props.closeAll3}
                        closeAll2={props.closeAll2}
                        deleteItem2={props.deleteItem2}
                        userName={props.userName}
                        apiKey={props.apiKey}
                        onDragEnd={onDragEnd}
                        showRepositories={props.showRepositories}
                      />
                    );
                  })}
                  {droppableProvided.placeholder}
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
                <div className="list1" onClick={handleShow}>
                  {" "}
                  <MdDriveFileRenameOutline className="icons" /> Rename
                </div>
                <div className="list2" style={style5}>
                  {" "}
                  <HiOutlineArchive className="icons" /> Archive all cards
                </div>
              </div>
              <div className="list-drop-down3">
                <div className="list3" onClick={hideColumn}>
                  {" "}
                  <BiHide className="icons" /> Hide Column
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
              {(droppableProvided) => (
                <div ref={droppableProvided.innerRef} onDragEnd={onDragEnd}
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
                        onDragEnd={onDragEnd}
                        showRepositories={props.showRepositories}
                      />
                    );
                  })}
                  {droppableProvided.placeholder}
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
