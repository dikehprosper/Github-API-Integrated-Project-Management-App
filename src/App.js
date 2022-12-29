import "./App.css";
import DropDownItem from "./components/DropDownItem";
import React, { useEffect, useRef, useState } from "react";
import Column from "./components/column";
import { nanoid } from "nanoid";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [showss, setShowss] = useState(false);
  const [userName, setUserName] = useState("");
  const [repoName, setRepoName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [savedUserName, setSavedUserName] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState(false);

  /*   useEffect(() => {
    console.log('this is' + userName)
  }, [userName]) */

  const handleShowss = () => {
    setShowss(true);
    const handleAllShow = columns.map((column) => {
      return {
        ...column,
        show: false,
        pick: false,
        highlight: false,
        called: false,
      };
    });
    setColumns(handleAllShow);
  };

  const hideShowss = () => setShowss(false);

  const onClick1 = () => {
    setDropDown(true);
    const handleAllShow = columns.map((column) => {
      return {
        ...column,
        show: false,
        pick: false,
        highlight: false,
        called: false,
      };
    });
    setColumns(handleAllShow);
  };

  const onClick2 = () => {
    setDropDown(false);
  };

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let columns = [
      {
        id: 1,
        name: "Todo",
      },
      {
        id: 2,
        name: "In Progress",
      },
      {
        id: 3,
        name: "Done",
      },
    ];
    setColumns(
      columns.map((d) => {
        return {
          pick: false,
          select: true,
          id: d.id,
          name: d.name,
          show: false,
          tables: "",
          called: false,
          highlight: false,
          count: 0,
        };
      })
    );
  }, []);

  function newColumns(name) {
    const newColumns = {
      name: name,
      id: nanoid(),
      select: true,
      pick: false,
      show: false,
      called: false,
      highlight: false,
      count: 0,
    };
    columns.push(newColumns);
    setColumns([...columns]);
  }

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function closeAll() {
    setShowss(false);
    const handleAllShow = columns.map((column) => {
      return {
        ...column,
        show: false,
        pick: false,
        highlight: false,
        called: false,
      };
    });
    setColumns(handleAllShow);
  }

  function DropItem(id) {
    onClick2();
    setColumns((column) =>
      column.map((column) => {
        return id === column.id
          ? {
              ...column,
              pick: !column.pick,
              highlight: false,
              called: false,
              show: false,
            }
          : {
              ...column,
              show: false,
              pick: false,
              highlight: false,
              called: false,
            };
      })
    );
  }

  function hideSpecificColumn(id) {
    const hideColumn = columns.map((column) => {
      if (id === column.id) {
        return { ...column, select: false };
      }
      return column;
    });
    setColumns(hideColumn);
  }

  function handleAllShow(id) {
    setShowss(false);
    const handleAllShow = columns.map((column) => {
      if (id === column.id) {
        return {
          ...column,
          show: true,
          highlight: false,
          pick: false,
          called: false,
        };
      }
      return {
        ...column,
        show: false,
        pick: false,
        highlight: false,
        called: false,
      };
    });
    setColumns(handleAllShow);
  }

  function deleteSpecificItem(id) {
    const deleteSpecificItem = columns.filter((column) => id !== column.id);

    setColumns(deleteSpecificItem);
  }

  function AddItem(id) {
    const updatedTables = columns.map((column) => {
      if (id === column.id) {
        return { ...column, called: false, highlight: false };
      }
      return column;
    });
    setColumns(updatedTables);
  }

  function updateColumn(id, name) {
    const updatedColumns = columns.map((column) => {
      if (id === column.id) {
        return { ...column, name: name, show: false };
      }
      return column;
    });
    setColumns(updatedColumns);
  }

  let result1 = columns.every(function (e) {
    return e.select === false;
  });

  let result2 = columns.every(function (e) {
    return e.select === true;
  });

  function Visible() {
    return (
      <div>
        <div className="title">{result1 ? "" : "Visible column(s)"}</div>
        {columns.map((d) => {
          const style = {
            display: d.select ? "block" : "none",
          };

          d.pick = false;
          return (
            <h4 key={d.id} style={style}>
              {" "}
              <input
                className="input"
                type="checkbox"
                name=""
                checked={d.select}
                onChange={(event) => {
                  let checked = event.target.checked;
                  setColumns(
                    columns.map((data) => {
                      if (d.id === data.id) {
                        data.select = checked;
                      }
                      return data;
                    })
                  );
                }}
              />
              <label className="label" htmlFor={d.id}>
                {d.name}
              </label>
            </h4>
          );
        })}
      </div>
    );
  }

  function Hidden() {
    return (
      <div>
        <div className="title">{result2 ? "" : "Hidden column(s)"}</div>
        {columns.map((d) => {
          const style = {
            display: d.select ? "none" : "block",
          };

          d.pick = false;
          return (
            <h4 key={d.id} style={style}>
              <input
                className="input"
                type="checkbox"
                name=""
                id={d.id}
                checked={d.select}
                onChange={(event) => {
                  let checked = event.target.checked;
                  setColumns(
                    columns.map((data) => {
                      if (d.id === data.id) {
                        data.select = checked;
                      }
                      return data;
                    })
                  );
                }}
              />{" "}
              <label className="label" htmlFor={d.id}>
                {d.name}
              </label>
            </h4>
          );
        })}
      </div>
    );
  }

  function openInput(id) {
    setShowss(false);
    const specifiedInput = columns.map((column) => {
      if (id === column.id) {
        return {
          ...column,
          called: true,
          highlight: true,
          pick: false,
          show: false,
        };
      }
      return {
        ...column,
        pick: false,
        called: false,
        highlight: false,
        pick: false,
        show: false,
      };
    });
    setColumns(specifiedInput);
  }

  function closeInput() {
    const closeAllInput = columns.map((column) => {
      return { ...column, called: false };
    });
    setColumns(closeAllInput);
  }

  function saveUserName() {
    newUserName();
    setSavedUserName(true);
  }
  function newUserName() {
    setUserName(userName);
  }

  
  function saveApiKey() {
    newApiKey();
    setSavedApiKey(true);
  }
  function newApiKey() {
    setApiKey(apiKey);
  }


  return (
    <div className="body">
      <div>
      <div className="form-input-username1">
        {" "}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveUserName();
            }}
          >
            <div className="">
              <input
                autoFocus
                className="form-input-username2"
                id="name"
                placeholder="Enter your username"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="form-input-username3" onClick={saveUserName} >
          {savedUserName ? "saved" : "save"}
        </div>
      </div>

      <div className="form-input-username1">
        {" "}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveApiKey();
            }}
          >
            <div className="">
              <input
                autoFocus
                className="form-input-username2"
                id="api key"
                placeholder="Enter your Api-key"
                type="text"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                }}
              />
            </div>
          </form>
        </div>
        <div className="form-input-username3" onClick={saveApiKey} >
          {savedApiKey ? "saved" : "save"}
        </div>
      </div>
</div>
      <div className="drop-down">
        <div ref={menuRef} className="total-column">
          {columns.map((column) => {
            return (
              <Column
                key={column.id}
                {...column}
                onClick={() => DropItem(column.id)}
                updateColumn={updateColumn}
                hideSpecificColumn={hideSpecificColumn}
                handleAllShow={handleAllShow}
                deleteSpecificItem={deleteSpecificItem}
                Hidden={Hidden}
                Visible={Visible}
                AddItem={AddItem}
                openInput={openInput}
                closeInput={closeInput}
                closeAll={closeAll}
                userName={userName}
                apiKey={apiKey}
              />
            );
          })}
        </div>

        {dropDown ? (
          <DropDownItem
            newColumns={newColumns}
            Hidden={Hidden}
            Visible={Visible}
            handleShowss={handleShowss}
            showss={showss}
            hideShowss={hideShowss}
          />
        ) : (
          <button onClick={onClick1} className="add-button">
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
