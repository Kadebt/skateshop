import React from "react";
import "./styling/fullitem.css";
import close from "./styling/icons/icons8-close-window-50.png";

const FullItem = (props) => {
  return (
    <>
      <div className="full-item">
        <img
          className="close-btn"
          src={close}
          onClick={() => {
            props.setPopUp(false);
          }}
        />
        <p>{props.name}</p>
        <p>{props.brand}</p>
        <img className="fullitem-img" src={props.img} />
        <div className="price-size">
          <p>${props.price}</p>
          <p>Size: {props.size}</p>
        </div>
      </div>
    </>
  );
};

export default FullItem;
