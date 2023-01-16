import React from "react";

function Items(props) {
    function postIssue(){
      props.closeAll2(props.id, props.columnId);
        props.postIssue(props.itemId, props.id, props.columnId, props.tables )
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
