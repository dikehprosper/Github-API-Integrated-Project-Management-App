import React from "react";

function DropDownItem(props) {
  const [name, setName] = React.useState("");
 



  return (
    <div className="create-column">
      {props.showss ? (
        <div className="new-column">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName("");
              props.newColumns(name);
              props.hideShowss();
          
            }}
          >
            <div className="">
              <input
              autoFocus
                className="form-input1"
                id="name"
                placeholder="New Column"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
      ) : null}

      <div className="create-column-section">
        <button className="add-button2" onClick={props.handleShowss}>
          {" "}
          + &nbsp; New Column
        </button>
        <div className="create-column-section1" >
          {props.Visible()}
          {props.Hidden()}
        </div>
      </div>
    </div>
  );
}

export default DropDownItem;
