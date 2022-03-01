import React from "react";
import "./styling/payment.css";
import { FcCheckmark } from "react-icons/fc";

const Payment = (props) => {
  return (
    <div className="payment-complete">
      <h1 className="Payment-success">
        Your payment of {props.total} was completed
      </h1>
      {/* <FcCheckmark value={{ style: { innerHeight: "200px" } }} /> */}
    </div>
  );
};
export default Payment;
