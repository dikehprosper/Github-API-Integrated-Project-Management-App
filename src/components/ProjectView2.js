import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";

function ProjectView2(props) {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [valueCollected, setValueCollected] = useState(props.tables);
  function changeMode() {
    setIsInEditMode(true);
  }

  function changeMode1() {
    setIsInEditMode(false);
  }

  async function updateColumn2() {
    changeMode1();
    props.updateColumn2(props.id, props.columnId, valueCollected);
    props.updateColumn3(valueCollected, props.issueNumber, props.currentRepoName);
  }

  return (
    <div className="project-view-style1">
      <div className="project-view-style2">
        <div className="project-view-style12">
          <div className="project-view-style15">
            <RiGitRepositoryLine />
            &nbsp;&nbsp;
            <div>hhhhhjjj {props.currentRepoName}</div>
            &nbsp;&nbsp; {props.issueNumber}
            <div>hhh</div>
          </div>
          <div className="project-view-style16">
            <AiOutlineClose
              className="close-icons"
              onClick={props.closeProjectView}
            />
          </div>
        </div>
        <div className="project-view-style13">
          {isInEditMode ? (
            <div className="project-view-style20">
              <form
                className="project-view-style23"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateColumn2();
                }}
              >
                <input
                  autoComplete="off"
                  className="project-view-style23"
                  autoFocus
                  id=""
                  placeholder=""
                  type="text"
                  value={valueCollected}
                  onChange={(e) => {
                    setValueCollected(e.target.value);
                  }}
                />
              </form>
              <div className="project-view-style21" onClick={updateColumn2}>
                Save
              </div>
              <div className="project-view-style22" onClick={changeMode1}>
                Cancel
              </div>
            </div>
          ) : (
            <div className="project-view-style17">
              <div className="project-view-style18">
                {" "}
                <h4> {props.tables}</h4> &nbsp; &nbsp; #55{props.issueNumber}
              </div>
              <div className="project-view-style19" onClick={changeMode}>
                {" "}
                Edit
              </div>
            </div>
          )}
        </div>
        <div className="project-view-style14"></div>
      </div>
      <div className="project-view-style3">
        <div className="project-view-style4">
          <div className="project-view-style6"></div>
          <div className="project-view-style7">
            <div className="project-view-style10"></div>
            <div className="project-view-style11"></div>
          </div>
        </div>
        <div className="project-view-style5">
          <div className="project-view-style8"></div>
          <div className="project-view-style9"></div>
        </div>
      </div>
    </div>
  );
}
export default ProjectView2;
