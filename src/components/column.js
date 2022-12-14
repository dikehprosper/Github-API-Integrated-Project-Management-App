import React, { useEffect } from "react";
import Issues from "./Issues";
import { HiOutlineArchive } from "react-icons/hi";
import { BiHide } from "react-icons/bi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { nanoid } from "nanoid";

function Column(props) {
  const [name, setName] = React.useState(props.name);
  const [issue, setIssue] = React.useState([]);

  useEffect(() => {
    const newIssue = {
      id: nanoid(),
      tables: props.tables,
      pick: false,
      selection: false,
    };
    setIssue((prevState) => {
      return [...prevState, newIssue];
    });
  }, [props.tables]);

  function section(id, pick, selection) {
    const handleAllShow = issue.map((issue) => {
      if (id === issue.id) {
        return { ...issue, selection: true };
      } 
      return { ...issue, selection: false };
    });
    setIssue(handleAllShow);
  }

  function section2(id, pick, selection) {
    const handleAllShow = issue.map((issue) => {
      if (id === issue.id && pick === true) {
        return { ...issue, selection: true };
      } else{
      return { ...issue, selection: false }};
    });
    setIssue(handleAllShow);
  }

  function DropItem2(id, pick, selection) {
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
    console.log("form submitted");
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
            <div className="count">{props.count}</div>
          </div>
          <div className="drop-down4" >
            <div className="toggle" onClick={props.onClick}>...</div>
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
        <div className="main-section">
          <div>
            {issue.map((issue) => {
              return (
                <Issues
                  key={issue.id}
                  id={issue.id}
                  tables={issue.tables}
                  pick={issue.pick}
                  DropItem2={DropItem2}
                  selection={issue.selection}
                  section={section}
                  section2={section2}
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
            <div className="count">{props.count}</div>
          </div>
          <div className="drop-down4">
            <div className="toggle" onClick={props.onClick}>...</div>
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
        <div className="main-section">
          <div>
            {issue.map((issue) => {
              return (
                <Issues
                  key={issue.id}
                  id={issue.id}
                  tables={issue.tables}
                  pick={issue.pick}
                  DropItem2={DropItem2}
                  selection={issue.selection}
                  section={section}
                  section2={section2}
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
      />
    </div>
  );
}
export default Column;
