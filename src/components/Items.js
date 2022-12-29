import React from "react";

function Items(props) {
    function postIssue(){
        props.postIssue(props.id)
    };

  return (
    <>
      <div onClick={postIssue} className="list5">
      {props.name}
     </div>
    </>
  );
}
export default Items;
