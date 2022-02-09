import React from "react";

const FullItem = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          props.setPopUp(false);
        }}
      >
        close
      </button>
      <p>{props.name}</p>
      <p>{props.brand}</p>
      <img style={{ height: "100px", width: "100px" }} src={props.img} />
      <p>{props.price}</p>
      <p>{props.size}</p>
    </div>
  );
};

export default FullItem;
