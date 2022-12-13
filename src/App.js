import "./App.css";
import DropDownItem from "./components/DropDownItem";
import React, { useEffect } from "react";
import Column from "./components/column";
import { nanoid } from "nanoid";
import { propTypes } from "react-bootstrap/esm/Image";

function App() {
  const [dropDown, setDropDown] = React.useState(false);
  const [tables, setTables] = React.useState("");

  const onClick1 = () => {
    setDropDown(true);
    const handleAllShow = columns.map((column) => {
      return { ...column, show: false, pick: false, highlight: false, called:false };
    });
    setColumns(handleAllShow);
  };

  const onClick2 = () => {
    setDropDown(false);
  };
  const [columns, setColumns] = React.useState([]);
  

  const [visibility, setVisibility] = React.useState(false);
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

  function DropItem(id) {
    onClick2();
    closeInput();
    setColumns((column) =>
      column.map((column) => {
        return id === column.id
          ? { ...column, pick: !column.pick, highlight: false,show: false, called:false}
          : { ...column, show: false, pick: false, highlight: false, called:false  };
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
    const handleAllShow = columns.map((column) => {
      if (id === column.id) {
        return { ...column, show: true };
      }
      return { ...column, show: false };
    });
    setColumns(handleAllShow);
  }

  function deleteSpecificItem(id) {
    const deleteSpecificItem = columns.filter((column) => id !== column.id);

    setColumns(deleteSpecificItem);
  }

  function AddItem(id , valueCollected, count) { 
    console.log(count);
    const updatedTables = columns.map((column) => {
      if (id === column.id) {
        return { ...column, tables: valueCollected, called:false, count: count + 1};
      }
      return column;
    });
    setColumns(updatedTables);
  }
                                
  function newColumns(name) {
    const newColumns = {
      name: name,
      id: nanoid(),
      select: true,
      pick: false,
      show: false,
      called: false,
      highlight: false,
      tables: "",
      count: 0,
    };
    setColumns([...columns, newColumns]);
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
    const specifiedInput = columns.map(column => {
      if (id === column.id){
        return {...column, called:true, highlight: true, pick:false}
      };
      return {...column, pick:false}
    });
    setColumns(specifiedInput);
  }

   function closeInput() {
    const closeAllInput = columns.map(column => {
      return {...column, called:false}
    });
    setColumns(closeAllInput);
  }
  

  return (
    <div className="body">
      <div className="drop-down">
        {columns.map((column) => {
          return (
            <Column
              key={column.id}
              id={column.id}
              name={column.name}
              select={column.select}
              pick={column.pick}
              count ={column.count}
              called={column.called}
              highlight={column.highlight}
              show={column.show}
              onClick={() => DropItem(column.id)}
              updateColumn={updateColumn}
              hideSpecificColumn={hideSpecificColumn}
              handleAllShow={handleAllShow}
              deleteSpecificItem={deleteSpecificItem}
              Hidden={Hidden}
              Visible={Visible}
              AddItem={AddItem}
              tables = {column.tables}
              openInput ={openInput}
             closeInput = {closeInput}
            />
          );
        })}

        {dropDown ? (
          <DropDownItem
            newColumns={newColumns}
            Hidden={Hidden}
            Visible={Visible}
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
