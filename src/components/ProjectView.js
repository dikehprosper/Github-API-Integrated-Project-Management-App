import React from "react";
import ProjectView2 from "./ProjectView2";
import ProjectView3 from "./ProjectView3";
import Backdrop from "./Backdrop";

function ProjectView(props) {
    console.log(props.id, props.columnId)
  return props.issueCreated ? (
    <>
      {" "}
      <Backdrop closeProjectView={props.closeProjectView} />{" "}
      <ProjectView2
        closeProjectView={props.closeProjectView}
        currentRepoName={props.currentRepoName}
        issueNumber={props.issueNumber}
        tables={props.tables}
        updateColumn2={props.updateColumn2}
        id={props.id}
        columnId={props.columnId}
        updateColumn3={props.updateColumn3}
      />{" "}
    </>
  ) : (
    <>
      {" "}
      <Backdrop closeProjectView={props.closeProjectView} />{" "}
      <ProjectView2
        closeProjectView={props.closeProjectView}
        currentRepoName={props.currentRepoName}
        issueNumber={props.issueNumber}
        tables={props.tables}
        updateColumn2={props.updateColumn2}
        columnId={props.columnId}
        id={props.id}
        updateColumn3={props.updateColumn3}
      />
    </>
  );
}
export default ProjectView;
