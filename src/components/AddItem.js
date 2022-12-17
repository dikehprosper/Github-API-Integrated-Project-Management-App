import React, { useState } from "react";
import { VscIssueDraft } from "react-icons/vsc";
import { RiGitRepositoryLine } from "react-icons/ri";
import { BsArrowRightShort } from "react-icons/bs";

function AddItem(props) {
  const [valueCollected, setValueCollected] = useState("");
  const [focused, setFocused] = useState(true);
  const [plusItem, setPlusItem] = React.useState(false);
  const [called, setCalled] = useState(props.called);


  const onClick3 = () => {
    setPlusItem(true);
  };

  const onClick4 = () => {
    setPlusItem(false);
  };

  return (
    <>
      {props.called ? (
        <div className="design1" ref={props.menuRef}>
          {focused ? (
            <>
            {plusItem ? ( <>
              <div className="design2">
                  <div className="plus-item">
                    <div className="plus-item2a" onClick={onClick4} >
                      {" "}
                      <VscIssueDraft className="icons" /> Create a draft
                    </div>
                    <div className="plus-item2b">
                      {" "}
                      <div>
                        <RiGitRepositoryLine className="icons" /> Add Item from
                        repository
                      </div>{" "}
                      <div >
                        <BsArrowRightShort className="icons" />
                      </div>
                    </div>
                  </div>
                <div className="design6"  onClick={onClick3}> +</div>
              </div>
              <div className="design4">
                <form
                 
                  className="design5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.AddItem(props.id, valueCollected, props.count);
                    setValueCollected("");
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
                      onClick4();
                      setValueCollected(e.target.value);
                    }}
                  />
                </form>
              </div> </>):( <>
              
                <div className="design2">
            
                <div className="design6"  onClick={onClick3}> +</div>
              </div>
              <div className="design4">
                <form
                 
                  className="design5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    props.AddItem(props.id, valueCollected, props.count);
                    setValueCollected("");
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
                      onClick4();
                      setValueCollected(e.target.value);
                    }}
                  />
                </form>
              </div></>)}
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
