import React, { useState, useRef } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { VscIssueDraft } from "react-icons/vsc";
import DeleteItem3 from "./DeleteItem3";
import RestoreArchive from "./RestoreArchive";

function Archived(props, { menuRef }) {
  const [show, setShow] = useState(false);

  console.log(props.archivedTime)
  return (
    <div key={props.id}>
      {props.issue.map((issue) => {
        const style = {
          display: issue.isArchived ? "grid" : "none",
        };

        const style10 = {
          display: issue.archiveDropdownMenu ? "grid" : "none",
        };

        return (
          <div className="archive-container5" key={issue.id}>
            <div style={style}>
              <div className="archived-container6">
                <div className="archived-container8" onClick={props.closeAll}>
                  {issue.issueCreated ? (
                    <>
                      <VscIssueDraft className="icons" />
                    </>
                  ) : (
                    <>
                      <VscIssueDraft className="icons-1" />
                    </>
                  )}
                </div>
                <div className="archived-container9">
                  <div className="archived-container9-2">
                    {issue.tables} &nbsp;
                    {issue.issueNumber ? <>#{issue.issueNumber}</> : null}
                    {issue.isArchived && (
                      <div
                        className="archived-container9-3"
                        onClick={props.closeAll}
                      >
                        archived at about &nbsp;
                        <span className="span2">
                    {issue.isArchived && Math.floor(Math.round(Date.now()-issue.lastExecutedTime)/1000)}
                        </span>{" "}
                        &nbsp; seconds ago by &nbsp;
                        <span className="span3">
                          {props.userName === "" ? (
                            <>Dikeprosper123</>
                          ) : (
                            <>{props.userName}</>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className="archived-container9-1"
                    onClick={props.closeAll}
                  ></div>
                </div>

                <div
                  className="archived-container10"
                  onClick={() => props.ArchiveDropdown(props.id, issue.id)}
                >
                  <VscEllipsis className="icons-archive" />{" "}
                  <div className="list-drop-down4-2" style={style10}>
                    <div className="list-drop-down5">
                      <RestoreArchive
                        id={issue.id}
                        onClick3={props.onClick3}
                        columnId={props.id}
                        unArchiveItem={props.unArchiveItem}
                      />

                      <DeleteItem3
                        id={issue.id}
                        deleteItem3={props.deleteItem3}
                        tables={props.tables}
                        columnId={props.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Archived;
