import "./App.css";
import DropDownItem from "./components/DropDownItem";
import React, { useEffect, useRef, useState } from "react";
import Column from "./components/column";
import { nanoid } from "nanoid";
import Archive from "./components/Archive";
import { DragDropContext } from "react-beautiful-dnd";
import { propTypes } from "react-bootstrap/esm/Image";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [showss, setShowss] = useState(false);
  const [userName, setUserName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [savedUserName, setSavedUserName] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState(false);

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
        issue: [],
      },
      {
        id: 2,
        name: "In Progress",
        issue: [],
      },
      {
        id: 3,
        name: "Done",
        issue: [],
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
          issue: d.issue,
        };
      })
    );
  }, []);

  //functions for outer columns

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
      issue: [],
    };
    columns.push(newColumns);
    setColumns([...columns]);
  }

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        closeAll();
        console.log(menuRef.current);
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
        issue: column.issue.map((issue) => {
          return {
            ...issue,
            pick: false,
            selection: false,
            selection2: false,
            shownRepositories: true,
          };
        }),
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
              issue: column.issue.map((issue) => {
                return {
                  ...issue,
                  pick: false,
                  selection: false,
                  selection2: false,
                  shownRepositories: true,
                };
              }),
            }
          : {
              ...column,
              show: false,
              pick: false,
              highlight: false,
              called: false,
              issue: column.issue.map((issue) => {
                return {
                  ...issue,
                  pick: false,
                  selection: false,
                  selection2: false,
                  shownRepositories: true,
                };
              }),
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
          issue: column.issue.map((issue) => {
            return {
              ...issue,
              pick: false,
              selection: false,
              selection2: false,
              shownRepositories: true,
            };
          }),
        };
      }
      return {
        ...column,
        show: false,
        pick: false,
        highlight: false,
        called: false,
        issue: column.issue.map((issue) => {
          return {
            ...issue,
            pick: false,
            selection: false,
            selection2: false,
            shownRepositories: true,
          };
        }),
      };
    });
    setColumns(handleAllShow);
  }

  function deleteSpecificItem(id) {
    const deleteSpecificItem = columns.filter((column) => id !== column.id);

    setColumns(deleteSpecificItem);
  }

  function AddItem(id) {
    let updateColumns = columns.map((column) => {
      if (id === column.id) {
        return { ...column, called: false, highlight: false };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function newIssue(id, valueCollected) {
    let newIssue = {
      pick: false,
      id: nanoid(),
      selection: false,
      tables: valueCollected,
      selection2: false,
      shownRepositories: true,
    };

    let updateColumns = columns.map((column) => {
      if (id === column.id) {
        return {
          ...column,
          called: false,
          highlight: false,
          issue: [...column.issue, newIssue],
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function deleteItem2(id, columnId) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.filter((item) => id !== item.id),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function section(id, columnId) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, selection: true };
            }
            return { ...issue };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function section2(id, pick, columnId) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id && pick === true) {
              return { ...issue, selection: true, pick: true };
            } else if (id === issue.id && pick === false) {
              return { ...issue, selection: false, pick: false };
            }
            return { ...issue };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function dropItem2(id, columnId) {
    setShowss(false);
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          highlight: false,
          called: false,
          show: false,
          pick: false,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, pick: !issue.pick };
            }
            return { ...issue, selection: false, pick: false };
          }),
        };
      } else if (columnId !== column.id) {
        return {
          ...column,
          highlight: false,
          called: false,
          show: false,
          pick: false,
          issue: column.issue.map((issue) => {
            return { ...issue, pick: false };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function showRepositories(id, columnId) {
    setShowss(false);

    const updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, shownRepositories: false };
            }
            return { ...issue, shownRepositories: true };
          }),
        };
      } else if (columnId !== column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            return { ...issue, shownRepositories: true };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  let menuRef3 = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef3.current.contains(e.target)) {
        closeAll3();
        console.log(menuRef3.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function closeAll3(id) {
    const updateColumns = columns.map((column) => {
      if (id === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            return { ...column.issue, selection: false, pick: false };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function closeAll2(id, columnId) {
    const updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, selection: true, pick: false };
            }
            return { ...issue, selection: false, pick: false };
          }),
        };
      }
      return {
        ...column,
        issue: column.issue.map((issue) => {
          return { ...issue, selection: false, pick: false };
        }),
      };
    });
    setColumns(updateColumns);
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
          issue: column.issue.map((issue) => {
            return {
              ...issue,
              pick: false,
              selection: false,
              selection2: false,
              shownRepositories: true,
            };
          }),
        };
      }
      return {
        ...column,
        pick: false,
        called: false,
        highlight: false,
        show: false,
        issue: column.issue.map((issue) => {
          return {
            ...issue,
            pick: false,
            selection: false,
            selection2: false,
            shownRepositories: true,
          };
        }),
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
    <DragDropContext>
      {" "}
      <div className="body">
        <div className="body1">
          <div style={{ position: "sticky", left: "0" }}>
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
              <div className="form-input-username3" onClick={saveUserName}>
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
              <div className="form-input-username3" onClick={saveApiKey}>
                {savedApiKey ? "saved" : "save"}
              </div>
            </div>
          </div>
          <div className="drop-down">
            <div className="drop-down51">
              <div className="total-column" ref={menuRef}>
                {columns.map((column, index) => {
                  return (
                    <Column
                      key={column.id}
                      {...column}
                      index={index}
                      column={column}
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
                      newIssue={newIssue}
                      deleteItem2={deleteItem2}
                      section={section}
                      section2={section2}
                      closeAll3={closeAll3}
                      closeAll2={closeAll2}
                      menuRef3={menuRef3}
                      dropItem2={dropItem2}
                      showRepositories={showRepositories}
                    />
                  );
                })}
                ;
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
                <button className="add-button" onClick={onClick1}>
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
