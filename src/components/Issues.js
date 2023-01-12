import React, { useState, useEffect } from "react";
import DeleteItem2 from "./DeleteItem2";
import { MdDriveFileRenameOutline, MdWrongLocation } from "react-icons/md";
import { HiOutlineArchive } from "react-icons/hi";
import { VscIssueDraft } from "react-icons/vsc";
import { Octokit } from "@octokit/rest";
import Items from "./Items";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Archive from "./Archive";

function Issues(props) {
  const style3 = {
    display: props.selection2 ? "none" : "grid",
    border: props.selection ? "1px solid grey" : "none",
  };

  const [items, setItems] = useState([]);
 // const [shownRepositories, setShownRepositories] = useState(true);
  const [issueNumber, setIssueNumber] = useState("");
  const [currentRepoName, setCurrentRepoName] = useState("");
  const [dataRepositoryUrl , setDataRepositoryUrl] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(`https://api.github.com/users/${owner}/repos`);
      const data = await res.json();
      //console.log(data.name, data.id);

      setItems(data);
    };
    fetchRepos();
  }, [props.userName]);


  const apiKey =
    props.apiKey === ""
      ? "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"
      : props.apiKey;

  const octokit = new Octokit({
    auth: apiKey,
  });

  const owner = props.userName === "" ? "Dikeprosper123" : props.userName;

  const postIssue = async (id) => {
    props.closeAll2(props.id, props.columnId);
    const repo = items.map((item) => {
      if (id === item.id) {
        console.log(item.name);
        return item.name;
      }
    });

    const res = await octokit
      .request("POST https://api.github.com/repos/{owner}/{repo}/issues", {
        owner: owner,
        repo: repo,
        title: props.tables,
      })
      .then((res) => {
        if (res.status == 201) {
          console.log(res.data);
          setIssueNumber(res.data.number);
          props.changeIssueCreatedState(props.id, props.columnId, props.issueCreated);
          setCurrentRepoName(repo);
          alert(`issue created at ${res.data.html_url}`);
          setDataRepositoryUrl(res.data.html_url)
        } else {
          alert(`something went wrong. Response: ${JSON.stringify(res)}`);
        }
      });
      
  };

  function showRepositories() {
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
  };

 

  return (
    /* <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
      {(draggableProvided, draggableSnapshot) => ( */
        <div
          /* ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps} */
          style={style9}
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
                  onClick={() => {
                    props.closeAll2(props.id, props.columnId);
                  }}
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
                          {items.length === 0 ? (
                            <>
                              <p>No items to display!!</p>
                            </>
                          ) : (
                            <>
                              {items.map((item) => {
                                return (
                                  <Items
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    postIssue={postIssue}

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
                  onClick={() => {
                    props.closeAll2(props.id, props.columnId);
                  }}
                ></div>
              </div>

              <div
                className="issues2"
                onClick={() => {
                  props.closeAll2(props.id, props.columnId);
                }}
              >
                {" "}
                {props.tables}
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
                  onClick={() => {
                    props.closeAll2(props.id, props.columnId);
                  }}
                >
                  {" "}
                  <VscIssueDraft className="icons-1" />{" "}
                  <a href={dataRepositoryUrl} target="_blank"><span className="span1">{currentRepoName}</span></a>
                  <span>#{issueNumber}</span>
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
                  onClick={() => {
                    props.closeAll2(props.id, props.columnId);
                  }}
                ></div>
              </div>

              <div
                className="issues2"
                onClick={() => {
                  props.closeAll2(props.id, props.columnId);
                }}
              >
                {" "}
                {props.tables}
              </div>
            </div>
          )}
        </div>
    /*   )}
    </Draggable> */
  );
}

export default Issues;
