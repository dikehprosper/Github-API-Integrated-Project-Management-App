import React, { useState, useEffect } from "react";
import DeleteItem2 from "./DeleteItem2";
import { MdDriveFileRenameOutline, MdWrongLocation } from "react-icons/md";
import { HiOutlineArchive } from "react-icons/hi";
import { VscIssueDraft } from "react-icons/vsc";
import { Octokit } from "@octokit/rest";
import Items from "./Items";

function Issues(props) {
  const style3 = {
    display: props.selection2 ? "none" : "grid",
    border: props.selection ? "1px solid grey" : "none",
  };

  const [items, setItems] = useState([]);
  const [shownRepositories, setShownRepositories] = useState(true);
  const [issueNumber, setIssueNumber] = useState("");
  const [issueCreated, setIssueCreated] = useState(true);
  const [currentRepoName, setCurrentRepoName] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(`https://api.github.com/users/${owner}/repos`);
      const data = await res.json();
      console.log(data.name, data.id);

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
          setIssueNumber(res.data.number);
          setIssueCreated(false);
          setCurrentRepoName(repo);
          alert(`issue created at ${res.data.repository_URL}`);
        } else {
          alert(`something went wrong. Response: ${JSON.stringify(res)}`);
        }
      });
    // console.log(res.data.id);
  };

  function showRepositories() {
    setShownRepositories(false);
  }

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

  console.log(shownRepositories, props.pick);

  /*    const style9 = {
    display: props.shownRepositories ? "none" : "grid",
  };  */

  return (
    <>
      {issueCreated ? (
        <div
          style={style3}
          className="issues1"
          onMouseEnter={section}
          onMouseLeave={section2}
        >
          <div className="issues2">
            <VscIssueDraft className="icons" /> Draft
            <div className="drop-down5" style={style6} onMouseEnter={section}>
              <div
                className="toggle2"
                onClick={() => {
                  props.dropItem2(props.id, props.pick, props.selection);
                  setShownRepositories(true);
                }}
              >
                ...
              </div>

              {shownRepositories ? (
                <div className="list-drop-down4" style={style7}>
                  <div className="list-drop-down5">
                    <div
                      className="list1"
                      style={style8}
                      onClick={showRepositories}
                    >
                      {" "}
                      <MdDriveFileRenameOutline className="icons" /> Convert to
                      issue
                    </div>
                    <div className="list2">
                      {" "}
                      <HiOutlineArchive className="icons" /> Archive
                    </div>
                    <DeleteItem2
                      id={props.id}
                      deleteItem2={props.deleteItem2}
                      selection2={props.selection2}
                      tables={props.tables}
                    />
                  </div>
                </div>
              ) : (
                <div className="list-drop-down41" style={style7}>
                  <div className="list-drop-down5">
                    <div>
                      {items === "" ? (
                        <>
                          {" "}
                          {items.map((item) => {
                            return (
                              <Items
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                postIssue={postIssue}
                              />
                            );
                          })}{" "}
                        </>
                      ) : (
                        <>
                    <span>Not connected!!</span>
                           </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="issues2"
            onClick={() => {
              props.closeAll2(props.id);
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
            <VscIssueDraft className="icons-1" />{" "}
            <span className="span1">{currentRepoName}</span>{" "}
            <span>#{issueNumber}</span>
            <div className="drop-down5" style={style6} onMouseEnter={section}>
              <div
                className="toggle2"
                onClick={() => {
                  props.dropItem2(props.id, props.pick, props.selection);
                }}
              >
                ...
              </div>
              <div className="list-drop-down4-1" style={style7}>
                <div className="list-drop-down5">
                  <div className="list2">
                    {" "}
                    <HiOutlineArchive className="icons" /> Archive
                  </div>

                  <DeleteItem2
                    id={props.id}
                    deleteItem2={props.deleteItem2}
                    selection2={props.selection2}
                    tables={props.tables}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="issues2"
            onClick={() => {
              props.closeAll2(props.id);
            }}
          >
            {" "}
            {props.tables}
          </div>
        </div>
      )}
    </>
  );
}

export default Issues;
