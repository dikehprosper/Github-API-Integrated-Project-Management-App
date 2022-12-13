import React, { useState } from "react";

function AddItem(props) {
  const [valueCollected, setValueCollected] = useState("");
  const [focused, setFocused] = useState(true);
  
  return (
    <>
      {props.called ? (
        <div className="design1">
          {focused ? (
            <>
              <div className="design2">+</div>
              <div className="design4">
                <form
                  className="design5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.AddItem(props.id , valueCollected, props.count);
                    setValueCollected('')
                  }}
                >
                  <input
                    className="design5"
                    autoFocus
                    id="name"
                    placeholder="You can use Control + Space to add an item"
                    type="text"
                    value={valueCollected}
                    onChange={(e) => {
                      setValueCollected(e.target.value);
                    }}
                  />
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="design2">+</div>
              <div className="design3">
                Type to add a draft issue or use # to search
              </div>
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
export default AddItem;
