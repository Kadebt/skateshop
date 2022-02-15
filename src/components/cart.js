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

const stripePromise = loadStripe("pk_test_GxDPnMdvGuy27Ag4bWyuFTQm00NgQGG4IY");

const Cart = (props) => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios.get("/api/getCart").then((res) => {
      props.getCart(res.data);
      setLoading(false);
      findtotal(props.cart.cart);
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

  const handleDeleteCart = (id) => {
    axios.delete(`/api/deleteItem/${id}`).then((res) => {
      console.log(res.data);
      props.deleteItem(res.data);
    });
  };

  let findtotal = (arr) => {
    let price = 0;
    for (let i = 0; i < arr.length; i++) {
      price = arr[i].price + price;
    }
    setTotal(price);
  };

  console.log(props);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
  };

  const cartMapped = props.cart.cart.map((e) => {
    return (
      <div>
        <h1>{e.name}</h1>
        <p>{e.brand}</p>
        <img style={{ height: "100px", width: "100px" }} src={e.content} />
        <p>{e.price}</p>
        <p>{e.size}</p>
        <button
          onClick={() => {
            handleDeleteCart(e.id);
          }}
        >
          remove from cart
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
  console.log(props.cart.cart.length);
  return (
    <div>
      {props.cart.cart.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        <div>
          {cartMapped}
          {console.log("hit")}
          {props.user.user.points >= 50 ? (
            <button onClick={handleUsePoints}>Use Points</button>
          ) : (
            <p>Earn 50 Points for $5 off</p>
          )}
          {total}
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
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
