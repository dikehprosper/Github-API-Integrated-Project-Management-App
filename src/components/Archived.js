import React from "react";

function Archived({ issue }) {
    
   const style = {
display: issue.isArchived? "grid": "none"
   }

  return (
    <>
      <div style={style}>
        <div className="archived-container6"> <div>{issue.tables}</div>
    <div>...</div>
         </div>
      </div>
    </>
  );
}
export default Archived;
