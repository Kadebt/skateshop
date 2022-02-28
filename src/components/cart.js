import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteItem, getCart } from "../ducks/cartreducer";
import { userPoints } from "../ducks/reducer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { BounceLoader } from "react-spinners";
import CheckoutForm from "./CheckoutForm";
import "./styling/cart.css";

const stripePromise = loadStripe("pk_test_GxDPnMdvGuy27Ag4bWyuFTQm00NgQGG4IY");

const Cart = (props) => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.get("/api/getCart").then((res) => {
      props.getCart(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const body = {
      items: props.cart.cart,
    };
    axios.post("/api/checkout", body).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, []);

  useEffect(() => {
    console.log("hit");
    let price = 0;
    for (let i = 0; i < props.cart.cart.length; i++) {
      console.log(i);
      price = props.cart.cart[i].price + price;
    }
    setTotal(price);
  }, [props.cart.cart]);

  const handleDeleteCart = (id) => {
    axios.delete(`/api/deleteItem/${id}`).then((res) => {
      console.log(res.data);
      props.deleteItem(res.data);
    });
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
  };

  const cartMapped = props.cart.cart.map((e) => {
    return (
      <div className="item-wrapper">
        <img style={{ height: "100px", width: "100px" }} src={e.content} />
        <h1 className="cart-name">{e.name}</h1>
        <div className="lower-item-wrap">
          <p>${e.price}</p>
          <p>{e.size}</p>
        </div>
        <button
          className="remove-button"
          onClick={() => {
            handleDeleteCart(e.id);
          }}
        >
          -
        </button>
      </div>
    );
  });

  const handleUsePoints = () => {
    const body = { points: props.user.user.points - 50 };
    const id = props.user.user.id;
    axios.put(`/api/usepoints/${id}`, body).then((res) => {
      props.userPoints(res.data);
    });
    setTotal(total - 5);
  };

  return (
    <div>
      {props.cart.cart.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        <div className="cart-wrapper">
          <div className="cart-items">{cartMapped}</div>
          {console.log("hit")}
          <div className="lower-cart">
            {props.user.user.points >= 50 ? (
              <button onClick={handleUsePoints}>Use Points</button>
            ) : (
              <p>Earn 50 Points for $5 off</p>
            )}
            <p>Total ${total}</p>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      )}
      {/* {loading === true && props.cart.cart.length > 0 ? (
        <BounceLoader />
      ) : ( */}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { deleteItem, getCart, userPoints })(
  Cart
);
