import React from "react";
import DeleteItem2 from "./DeleteItem2";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiOutlineArchive } from "react-icons/hi";
import { VscIssueDraft } from "react-icons/vsc";

function Issues(props) {
  const style3 = {
    display: props.tables === "" ? "none" : "grid",
  };

  function section() {
    props.section(props.id);
  }

  function section2() {
    props.section2(props.id, props.pick);
  }

  const style6 = {
    display: props.selection ? "grid" : "none",
  };

  const style7 = {
    display: props.pick ? "grid" : "none",
  };

  const style8 = {
    background: props.selection ? "rgba(128, 128, 128, 0.411)" : "transparent",
  };

  return (
    <div
      className="issues1"
      style={style3}
      onMouseEnter={section}
          onMouseLeave={section2}
    >
      <div className="issues2">
        <VscIssueDraft className="icons" /> Draft
        <div
          className="drop-down5"
          style={style6}
          onMouseEnter={section}
          onClick={() => {
            props.DropItem2(props.id, props.pick, props.selection);
          }}
        >
          <div
            className="toggle2"

          >
            ...
          </div>
          <div
            className="list-drop-down4"
            style={style7}
          >
            <div className="list-drop-down5">
              <div className="list1" style={style8}>
                {" "}
                <MdDriveFileRenameOutline className="icons" /> Convert to issue
              </div>
              <div className="list2">
                {" "}
                <HiOutlineArchive className="icons" /> Archive
              </div>

              <DeleteItem2 />
            </div>
          </div>
        </div>
      </div>

      <div className="issues2" onClick={() => {props.closeAll2(props.id)}}>
        {" "}
        {props.tables}
      </div>
    </div>
  );
}
export default Issues;
