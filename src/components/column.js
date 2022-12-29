import React, { useEffect, useRef, useState } from "react";
import Issues from "./Issues";
import { HiOutlineArchive } from "react-icons/hi";
import { BiHide } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { nanoid } from "nanoid";

function Column(props) {
  const [name, setName] = useState(props.name);
  const [issue, setIssue] = useState([]);

  /*    useEffect(() => {
    let issue =[ 
  ];
    setIssue(
      issue.map((issue) => {
        return {
          pick: false,
          id: issue.id,
          selection: false,
          tables: issue.tables,
         // shownRepositories:true,
        };
      })
    );
  }, []);  */

  function newIssue(valueCollected) {
    const newIssue = {
      pick: false,
      id: nanoid(),
      selection: false,
      tables: valueCollected,
      selection2: false,
      shownRepositories: true,
    };

    setIssue([...issue, newIssue]);
  }

  const count = issue.length;



  function deleteItem2(id) {
    //const index = issue.indexOf(id);
    // console.log(issue)
    setIssue(issue.filter((item) => id !== item.id));
    // console.log(handleAll);
    // setIssue(handleAll);
  }

  /*   useEffect(() => {
    console.log(issue.length, "deleted");
  }, [issue]); */

  function section(id) {
    const handleAll = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, selection: true };
      }
      return { ...issue };
    });
    setIssue(handleAll);
  }

  function section2(id, pick) {
    const handleAll = issue.map((issue) => {
      if (id === issue.id && pick === true) {
        return { ...issue, selection: true, pick: true };
      } else if (id === issue.id && pick === false) {
        return { ...issue, selection: false, pick: false };
      } 
      return { ...issue };
    });
    setIssue(handleAll);
  }

 
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function closeAll() {
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
  }

  function dropItem2(id) {
    const handleAllShow = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, pick: !issue.pick };
      }
      return { ...issue, selection: false, pick: false };
    });
    setIssue(handleAllShow);
  }

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

  return props.show ? (
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
            <div className="count" onClick={props.closeAll}>
              {props.count}
            </div>
          </div>
          <div className="middle" onClick={props.closeAll}></div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick}>
              ...
            </div>
            <div className="list-drop-down" style={style2}>
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
        <div className="main-section" onClick={props.closeAll}>
          <div>
            {issue.map((issue) => {
              return (
                <Issues
                  key={issue.id}
                  {...issue}
                  dropItem2={dropItem2}
                  section={section}
                  section2={section2}
                  menuRef={menuRef}
                  closeAll={closeAll}
                  closeAll2={closeAll2}
                  deleteItem2={deleteItem2}
                  userName={props.userName}
                  apiKey={props.apiKey}
                />
              );
            })}

            <div className="issues" style={style4}></div>
          </div>
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
        newIssue={newIssue}
      />
    </div>
  ) : (
    <div style={style1}>
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
          <div className="middle" onClick={props.closeAll}></div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick}>
              ...
            </div>
            <div className="list-drop-down" style={style2}>
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
        <div className="main-section" onClick={props.closeAll}>
          <div>
            <div ref={menuRef}>
              {issue.map((issue) => {
                return (
                  <Issues
                    key={issue.id}
                    {...issue}
                    dropItem2={dropItem2}
                    section={section}
                    section2={section2}
                    menuRef={menuRef}
                    closeAll={closeAll}
                    closeAll2={closeAll2}
                    deleteItem2={deleteItem2}
                    userName={props.userName}
                    apiKey={props.apiKey}
                  />
                );
              })}
            </div>
            <div className="issues" style={style4}></div>
          </div>
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
        newIssue={newIssue}
      />
    </div>
  );
}
export default Column;
