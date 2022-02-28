import React from "react";

const Payment = (props) => {
  return (
    <div>
      <h1 className="Payment-success">
        Your payment of {props.total} was completed
      </h1>
      <img
        className="success-image"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5b64PR0amr7Z_965yLgXl6PgtUOndoiVwQ&usqp=CAU"
      />
    </div>
  );
};
export default Payment;
