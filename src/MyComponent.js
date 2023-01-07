import React from 'react';

function MyComponent(props) {
  const outerArray = props.outerArray;

  return (
    <div>
      {outerArray.map((outerObject) => {
        return (
          <div key={outerObject.id}>
            <h1>{outerObject.title}</h1>
            {outerObject.innerArray.map((innerObject) => {
              return <ChildComponent key={innerObject.id} innerObject={innerObject} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

function ChildComponent(props) {
  const innerObject = props.innerObject;

  return (
    <div>
      <p>{innerObject.name}: {innerObject.value}</p>
    </div>
  );
}

export default MyComponent;
