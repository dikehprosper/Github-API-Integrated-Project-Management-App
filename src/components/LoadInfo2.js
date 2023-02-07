import React from "react";

function LoadInfo2(props) {
  return (
    <div className="style7">
      <div className="style8">
      <div className="close" onClick={props.close}>X</div>
      <div className="close2">This is a project management app integrated with Github API. It is
        modeled after Github Project Board and it enables users to
         create, update, open, and close issues seamlessly
          within the platform and also enable users to organize
           and prioritize tasks in an intuitive, visually appealing manner.
           </div>
           <div className="close3"  onClick={props.close}>Get Started</div>
      </div>
    </div>
  );
}
export default LoadInfo2;
