import React, { useState, useEffect } from "react";
import DeleteItem2 from "./DeleteItem2";
import { MdDriveFileRenameOutline, MdWrongLocation } from "react-icons/md";
import { VscIssueDraft } from "react-icons/vsc";
import Items from "./Items";
import Archive from "./Archive";

function Issues(props) {
  const style3 = {
    display: props.selection2 ? "none" : "grid",
    border: props.selection ? "1px solid grey" : "none",
  };


  const showRepositories = () => {

    props.showRepositories(props.id, props.columnId);
  }

  


  function section() {
    props.section(props.id, props.columnId);
  }

  function archiveItem(){
    props.archiveItem(props.id, props.columnId)
  }

  function section2() {
    props.section2(props.id, props.pick, props.columnId);
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

  const style9 = {
    display: props.isArchived ? "none" : "grid",
    overflowX: "visible",
  };

  function closeAll(){
    props.closeAll();
    props.closeAll2(props.id, props.columnId);
  }

  function openProjectView(){
    props.openProjectView(props.id, props.columnId);
  }
 

  return (
        <div
          style={style9}
          className="issues1-11"
        >
          {props.issueCreated ? (
            <div
              style={style3}
              className="issues1"
              onMouseEnter={section}
              onMouseLeave={section2}
            >
              <div className="issues2">
                <div
                  className="issue-name"
                  onClick={closeAll}
                >
                  <VscIssueDraft className="icons" /> Draft
                </div>
                <div
                  className="drop-down5"
                  style={style6}
                  onMouseEnter={section}
                >
                  <div
                    className="toggle2"
                    onClick={() => {
                      props.dropItem2(props.id, props.columnId);
                    }}
                  >
                    ...
                  </div>

                  {props.shownRepositories ? (
                    <div className="list-drop-down4" style={style7}>
                      <div className="list-drop-down5">
                        <div
                          className="list1"
                          style={style8}
                          onClick={showRepositories}
                        >
                          {" "}
                          <MdDriveFileRenameOutline className="icons" /> Convert
                          to issue
                        </div>
                        <Archive
                        onClick3={props.onClick3}
                        archiveItem={archiveItem} 
                        id={props.id}
                        selection2={props.selection2}
                        tables={props.tables}
                        columnId={props.columnId}
                        />

                        <DeleteItem2
                          id={props.id}
                          deleteItem2={props.deleteItem2}
                          selection2={props.selection2}
                          tables={props.tables}
                          columnId={props.columnId}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="list-drop-down41" style={style7}>
                      <div className="list-drop-down5">
                        <div>
                          {props.items.length === 0 ? (
                            <>
                              <p>No items to display!!</p>
                            </>
                          ) : (
                            <>
                              {props.items.map((item) => {
                                return (
                                  <Items
                                    key={item.id}
                                    itemId={item.id}
                                    name={item.name}
                                    postIssue={props.postIssue}
                                    columnId={props.columnId}
                                    id={props.id}
                                    closeAll2={props.closeAll2}
                                    tables={props.tables}
                                  />
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="empty-space"
                  onClick={closeAll}
                ></div>
              </div>

              <div
                className=".issues2-23"
                /* onClick={closeAll} */
              >
                <div  className="openProjectView" > <p onClick={openProjectView}> {props.tables}</p></div>
               
              
              </div>
            </div>
          ) : (
            <div
              style={style3}
              className="issues1"
              onMouseEnter={section}
              onMouseLeave={section2}
            >
              <div className="issues2">
                <div
                  className="issue-name"
                  onClick={closeAll}
                >
                  {" "}
                  <VscIssueDraft className="icons-1" />{" "}
                  <a href={props.dataRepositoryUrl} target="_blank" rel="noreferrer"><span className="span1">{props.currentRepoName}</span></a>
                  <span>#{props.issueNumber}</span>
                </div>
                <div
                  className="drop-down5"
                  style={style6}
                  onMouseEnter={section}
                >
                  <div
                    className="toggle2"
                    onClick={() => {
                      props.dropItem2(props.id, props.columnId);
                    }}
                  >
                    ...
                  </div>
                  <div className="list-drop-down4-1" style={style7}>
                    <div className="list-drop-down5">
                    <Archive
                        archiveItem={archiveItem} 
                        id={props.id}
                        selection2={props.selection2}
                        tables={props.tables}
                        columnId={props.columnId}
                         onClick3={props.onClick3}
                         issueNumber={props.issueNumber}
                         currentRepoName={props.currentRepoName}
                         dataRepositoryUrl={props.dataRepositoryUrl}
                        />

                      <DeleteItem2
                        id={props.id}
                        deleteItem2={props.deleteItem2}
                        selection2={props.selection2}
                        tables={props.tables}
                        columnId={props.columnId}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="empty-space"
                  onClick={closeAll}
                ></div>
              </div>

              <div
                className=".issues2-23"
                /* onClick={closeAll} */
              >
           <div  className="openProjectView" > <p onClick={openProjectView}> {props.tables}</p></div>
          
              </div>
            </div>
          )}
        </div>
  );
}

export default Issues;
