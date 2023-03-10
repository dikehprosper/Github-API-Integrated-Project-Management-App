/* eslint-disable no-lone-blocks */
import "./App.css";
import DropDownItem from "./components/DropDownItem";
import React, { useEffect, useRef, useState } from "react";
import Column from "./components/Column";
import { nanoid } from "nanoid";
import { DragDropContext } from "react-beautiful-dnd";
import Archived from "./components/Archived";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineArchive } from "react-icons/hi";
import { Octokit } from "@octokit/rest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadInfo from "./components/LoadInfo";
import LoadInfo2 from "./components/LoadInfo2";
import ProjectView from "./components/ProjectView";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [showss, setShowss] = useState(false);
  const [archivedState, setArchivedState] = useState(true);
  const [fetchdata, setFetchData] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [loaded2, setLoaded2] = useState(false);

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

  //to get length of total archive items
  const getTotalLength = (array, innerArrayProperty, innerProperty) => {
    let totalLength = 0;
    for (const object of array) {
      for (const innerObject of object[innerArrayProperty]) {
        if (innerObject[innerProperty]) {
          totalLength++;
        }
      }
    }
    return totalLength;
  };

  const totalLength = getTotalLength(columns, "issue", "isArchived");
  // getting username and api key

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

  useEffect(() => {
    let columns = [
      {
        id: "column-1",
        name: "Todo",
        issue: [],
      },
      {
        id: "column-2",
        name: "In Progress",
        issue: [],
      },
      {
        id: "column-3",
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
    onClick2();
    const hideColumn = columns.map((column) => {
      if (id === column.id) {
        return { ...column, select: false };
      }
      return column;
    });
    setColumns(hideColumn);
  }

  function handleAllShow(id) {
    onClick2();
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
    onClick2();
    let updateColumns = columns.map((column) => {
      if (id === column.id) {
        return { ...column, called: false, highlight: false };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function newIssue(id, valueCollected) {
    onClick2();
    let newIssue = {
      pick: false,
      id: nanoid(),
      selection: false,
      tables: valueCollected,
      selection2: false,
      shownRepositories: true,
      issueCreated: true,
      isArchived: false,
      archiveDropdownMenu: false,
      dataRepositoryUrl: "",
      currentRepoName: "",
      issueNumber: "",
      lastExecutedTime: null,
      timeSinceLastExecution: null,
      projectViewState: false,
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
    onClick2();
    let updateColumns = columns.map((column) => {
      console.log(id, columnId, column.id);
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.filter((item) => id != item.id),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function deleteItem3(columnId, id) {
    // onClick2();
    let updateColumns = columns.map((column) => {
      console.log(id, columnId, column.id);
      if (columnId === column.id) {
        column.issue = column.issue.filter((item) => item.id !== id);
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function deleteAllItem(id, columnId) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.filter((item) => id !== item.id && id == item.id),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  
  function updateColumn2(id, columnId, valueCollected) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, tables: valueCollected };
            }
            return { ...issue };
          }),
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
              return { ...issue, selection: true, pick: true};
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
    onClick2();
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
              return { ...issue, pick: !issue.pick, shownRepositories: true };
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

  function ArchiveDropdown(columnId, id) {
    setShowss(false);
    onClick2();
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
              return {
                ...issue,
                archiveDropdownMenu: !issue.archiveDropdownMenu,
              };
            }
            return {
              ...issue,
              selection: false,
              pick: false,
              archiveDropdownMenu: false,
            };
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
            return { ...issue, pick: false, archiveDropdownMenu: false };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function changeIssueCreatedState(id, columnId, issueCreated) {
    console.log(id, columnId);
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, issueCreated: false, pick: false };
            }
            return { ...issue };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }


  function archiveItem(id, columnId) {
    onClick2();
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return {
                ...issue,
                isArchived: true,
                lastExecutedTime: Date.now(),
                timeSinceLastExecution: null,
              };
            }
            return { ...issue };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function unArchiveItem(columnId, id) {
    onClick2();
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            console.log(columnId, column.id, issue.id, id, issue.isArchived);
            if (id === issue.id) {
              issue.isArchived = false;
            }
            return issue;
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function archiveItem2(columnId) {
    let updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          pick: false,
          issue: column.issue.map((issue) => {
            return { ...issue, isArchived: true };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function showRepositories(id, columnId) {
    setShowss(false);
    setFetchData((data) => !data);
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

  function openProjectView(id, columnId) {
    setShowss(false);
    setFetchData((data) => !data);
    const updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, projectViewState: true };
            }
            return { ...issue, projectViewState: false };
          }),
        };
      } else if (columnId !== column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            return { ...issue, projectViewState: false };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }

  function closeProjectView(id, columnId) {
    setShowss(false);
    setFetchData((data) => !data);
    const updateColumns = columns.map((column) => {
      if (columnId === column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            if (id === issue.id) {
              return { ...issue, projectViewState: false };
            }
            return { ...issue, projectViewState: false };
          }),
        };
      } else if (columnId !== column.id) {
        return {
          ...column,
          issue: column.issue.map((issue) => {
            return { ...issue, projectViewState: false };
          }),
        };
      }
      return column;
    });
    setColumns(updateColumns);
  }


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
      return column;
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

  //implementing the draggable function

  const onDragEnd = (result) => {
    // check if the draggable is dropped outside of the droppable
    if (!result.destination) {
      return;
    }

    // get the source and destination columns
    const sourceColumn = columns.find(
      (col) => col.id === result.source.droppableId
    );
    const destColumn = columns.find(
      (col) => col.id === result.destination.droppableId
    );

    // if the item is dropped in the same column, just reorder the items
    if (result.source.droppableId === result.destination.droppableId) {
      const newIssue = Array.from(sourceColumn.issue);
      const [removed] = newIssue.splice(result.source.index, 1);
      newIssue.splice(result.destination.index, 0, removed);

      const newColumn = {
        ...sourceColumn,
        issue: newIssue,
      };

      const newData = columns.map((col) => {
        if (col.id === result.source.droppableId) {
          return newColumn;
        }
        return col;
      });

      setColumns(newData);
    } else {
      // if the item is dropped in a different column, remove the item from the source column
      // and add it to the destination column
      const sourceTaskIds = [...sourceColumn.issue];
      const destTaskIds = [...destColumn.issue];
      const [removed] = sourceTaskIds.splice(result.source.index, 1);
      destTaskIds.splice(result.destination.index, 0, removed);
      const newData = columns.map((col) => {
        if (col.id === result.source.droppableId) {
          return { ...col, issue: sourceTaskIds };
        }
        if (col.id === result.destination.droppableId) {
          return { ...col, issue: destTaskIds };
        }
        return col;
      });
      setColumns(newData);
    }
  };

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
        issue: column.issue.map((issue) => {
          return {
            ...issue,
            pick: false,
            selection: false,
            selection2: false,
            shownRepositories: true,
            archiveDropdownMenu: false,
          };
        }),
      };
    });
    setColumns(handleAllShow);
  }

  const [savedUserName, setSavedUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedApikey, setSavedApikey] = useState(false);
  const [apikey, setApikey] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch(`https://api.github.com/users/${owner}/repos`, {
        headers,
      });
      const data = await res.json();
      //console.log(data.name, data.id);

      setItems(data);
    };
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchdata]);

  function checkAll() {
    if (savedApikey) {
      return toast.success(
        "WellDone!..You have successfully added your apikey and a username",
        {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      return toast("Now, enter your api key", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  function checkAll2() {
    if (savedUserName) {
      return toast.success(
        "WellDone!..You have successfully added a username your api key",
        {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } else {
      return toast("Now, enter a Username", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const headers = new Headers();
  headers.append("Authorization", `Token${process.env.REACT_APP_API_KEY}`);
  const notify = () =>
    toast.error("Network Error!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify1 = () =>
    toast.success("Username has been verified and also Saved!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify2 = () =>
    toast.warn("Username does not exist on Github!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify3 = () =>
    toast.warn("No Username Currently Entered!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const saveUserName = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      if (!response.ok) {
        notify2();
      } else {
        notify1();
        checkAll();
        setSavedUserName(true);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        notify();
      } else {
        notify2();
      }
    }
  };

  function collectUserName() {
    if (userName === "") {
      {
        notify3();
      }
    } else {
      {
        saveUserName();
      }
    }
  }

  const notify5 = () =>
    toast.error("Network Error!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify6 = () =>
    toast.success("Apikey is valid and has been Succesfully Saved!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify7 = () =>
    toast.warn("Apikey does not authenticate!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const notify8 = () =>
    toast.warn("No Apikey Currently Entered!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const saveApikey = async () => {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${apikey}`,
        },
      });
      console.log(response);
      if (response.status === 401 || response.status === 403) {
        notify7();
      } else if (response.status === 200 || response.status === 201) {
        notify6();
        checkAll2();
        setSavedApikey(true);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        notify5();
      } else {
        notify7();
      }
    }
  };

  function collectApikey() {
    if (apikey === "") {
      {
        notify8();
      }
    } else {
      {
        saveApikey();
      }
    }
  }

  //Dotenv.config();
  const variableValue = process.env.REACT_APP_API_KEY;

  const owner = savedUserName ? userName : "Dikeprosper123";
  const auth = savedApikey ? apikey : process.env.REACT_APP_API_KEY;

  const octokit = new Octokit({
    auth: auth,
  });

  const postIssue = async (itemId, id, columnId, tables) => {
    const repo = items.map((item) => {
      if (itemId === item.id) {
        console.log(item.name);
        return item.name;
      }
    });

    const response = await octokit.request(
      "POST https://api.github.com/repos/{owner}/{repo}/issues",
      {
        owner: owner,
        repo: repo,
        title: tables,
      }
    );

    if (response.status === 201) {
      console.log(response.data);
      const updateColumns = columns.map((column) => {
        if (columnId === column.id) {
          return {
            ...column,
            issue: column.issue.map((issue) => {
              if (id === issue.id) {
                return {
                  ...issue,
                  pick: false,
                  currentRepoName: repo,
                  dataRepositoryUrl: response.data.html_url,
                  issueNumber: response.data.number,
                  issueCreated: false,
                };
              }
              return { ...issue };
            }),
          };
        }
        return column;
      });
      setColumns(updateColumns);
      setIssueCreatedResponse(true);
      setLinkToIssueCreated(response.data.html_url);
    } else {
      setIssueCreatedResponse(false);
    }
  };

async function updateColumn3(valueCollected, issueNumber, currentRepoName){

  
 const response = await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: owner,
    repo: currentRepoName,
    issue_number: issueNumber ,
    title: valueCollected,
  })

  if (response.status === 201) {
    console.log(response.data);
  }else{
    console.log("error")
  }
}
  
  

  function checkIssueCreatedState() {
    if (issueCreatedResponse === true) {
      return (
        <div className="issueCreatedResponse1">
          <div className="issueCreatedResponse2">
            <div className="issueCreatedResponse3">SUCCESSFUL!!!</div>
            <div className="issueCreatedResponse4">
              issue created at &nbsp;
              <a href={linkToIssueCreated} target="_blank">
                <span className="issueCreatedResponse9">
                  {linkToIssueCreated}
                </span>
              </a>{" "}
            </div>
            <div className="issueCreatedResponse5">
              {" "}
              <div
                className="issueCreatedResponse6"
                onClick={() => setIssueCreatedResponse(null)}
              >
                Close
              </div>
              <div className="issueCreatedResponse6">
                <a href={linkToIssueCreated} target="_blank">
                  view
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (issueCreatedResponse === false) {
      return (
        <>
          <div className="issueCreatedResponse1">
            <div className="issueCreatedResponse2">
              <div className="issueCreatedResponse8">ERROR!!!</div>
              <div className="issueCreatedResponse4">
                Something went wrong!!!{" "}
              </div>
              <div className="issueCreatedResponse5">
                <div
                  className="issueCreatedResponse6"
                  onClick={() => setIssueCreatedResponse(null)}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }

  const styleSaved = {
    background: savedUserName ? "lightgreen" : "black",
    color: savedUserName ? "black" : "white",
  };

  const styleSaved2 = {
    background: savedApikey ? "lightgreen" : "black",
    color: savedApikey ? "black" : "white",
  };

  const [issueCreatedResponse, setIssueCreatedResponse] = useState(null);
  const [linkToIssueCreated, setLinkToIssueCreated] = useState();


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        <div className="body">
          {loaded ? (
            <LoadInfo
              close={() => setLoaded(false)}
              displayAbout={() => {
                setLoaded(false);
                setLoaded2(true);
              }}
            />
          ) : null}
          {loaded2 ? <LoadInfo2 close={() => setLoaded2(false)} /> : null}
          <div className="body1">
            {checkIssueCreatedState()}
            <div style={{ position: "sticky", left: "0" }}>
              <div className="form-input-username1">
                {" "}
                <div className="form-input-username-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      collectUserName();
                    }}
                  >
                    <input
                      autoFocus
                      className="form-input-username2"
                      id="name"
                      placeholder="Enter your Github username"
                      type="text"
                      value={userName}
                      onChange={(e) => {
                        setSavedUserName(false);
                        setUserName(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div
                  className="form-input-username3"
                  onClick={collectUserName}
                  style={styleSaved}
                >
                  <div className="saved3">
                    {" "}
                    {savedUserName ? "saved" : "save"}
                  </div>
                </div>
              </div>
              <div className="form-input-username1">
                {" "}
                <div className="form-input-username-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      collectApikey();
                    }}
                  >
                    <input
                      autoFocus
                      className="form-input-username2"
                      id="name"
                      placeholder="Enter your temporal api key to use"
                      type="text"
                      value={apikey}
                      onChange={(e) => {
                        setSavedApikey(false);
                        setApikey(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div
                  className="form-input-username3"
                  onClick={collectApikey}
                  style={styleSaved2}
                >
                  <div className="saved3">
                    {" "}
                    {savedApikey ? "saved" : "save"}
                  </div>
                </div>
              </div>
            </div>

            {archivedState ? (
              <>
                <div
                  style={{ position: "sticky", left: "0" }}
                  className="button-how-to-use1"
                >
                  <button
                    className="archived-button"
                    onClick={() => setArchivedState(false)}
                  >
                    View Archived Items
                  </button>
                  <button
                    className="archived-button"
                    onClick={() => setLoaded(true)}
                  >
                    How to use
                  </button>
                </div>
                <div className="drop-down">
                 

                  <div className="drop-down51" ref={menuRef}>
                  {columns.map((column) => {
                    return (
                      <div key={column.id}>
                        {column.issue.map((issue) => {
                          if (issue.projectViewState) {
                            return <ProjectView 
                            {...issue}
                            key = {issue.id}
                            closeProjectView={closeProjectView}
                            updateColumn2= {updateColumn2}
                            columnId= {column.id}
                            updateColumn3={updateColumn3}
                            />;
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    );
                  })}
                    <div className="total-column">
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
                            newIssue={newIssue}
                            deleteItem2={deleteItem2}
                            section={section}
                            section2={section2}
                            closeAll3={closeAll3}
                            closeAll2={closeAll2}
                            dropItem2={dropItem2}
                            showRepositories={showRepositories}
                            changeIssueCreatedState={changeIssueCreatedState}
                            archiveItem={archiveItem}
                            onClick3={dropItem2}
                            archiveItem2={archiveItem2}
                            deleteAllItem={deleteAllItem}
                            items={items}
                            postIssue={postIssue}
                            openProjectView={openProjectView}
                           
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
              </>
            ) : (
              <div className="archive-container">
                <div className="archive-container1">
                  {" "}
                  <BiArrowBack onClick={() => setArchivedState(true)} /> &nbsp;
                  &nbsp;Archive
                </div>
                <div className="note">
                  You can click on any empty area on your screen to update the
                  time a task was archived if a task is archived
                </div>
                <div className="archive-container2">
                  <div className="archive-container3" ref={menuRef}>
                    <div className="archive-container4" onClick={closeAll}>
                      {" "}
                      <div> {totalLength} archived item</div>
                    </div>
                    {totalLength === 0 ? (
                      <div className="archived-container11">
                        <HiOutlineArchive className="icons-archived-container11" />
                        <h4>There aren't any archived items</h4>
                        <p>
                          Archive items from a project view and they'll be shown
                          here.
                        </p>
                      </div>
                    ) : null}
                    {columns.map((column) => (
                      <Archived
                        key={column.id}
                        {...column}
                        unArchiveItem={unArchiveItem}
                        ArchiveDropdown={ArchiveDropdown}
                        deleteItem3={deleteItem3}
                        closeAll={closeAll}
                        userName={userName}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </DragDropContext>
  );
}

export default App;
