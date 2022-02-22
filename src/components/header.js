import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../ducks/reducer";
import "./styling/header.css";

const Header = (props) => {
  const location = useLocation();

  useEffect(() => {
    axios.get("/auth/check").then((res) => {
      props.getUser(res.data);
    });
  }, []);

  // const checkUser = () => {
  //   if (props.user.user !== undefined) {
  //     return null;
  //   } else if (location.pathname === "/login") {
  //     return null;
  //   } else {
  //     return <Link to="/login">Login</Link>;
  //   }
  // };

  // const cartCheck = () => {
  //   if (location.pathname == "/cart") {
  //     return <Link to="/">Home</Link>;
  //   } else {
  //     return <Link to="/cart">Cart</Link>;
  //   }
  // };

  return (
    <div>
      <div className="header-wrapper">
        {!!props.user.user ? (
          <p>you have {props.user.user.points} points</p>
        ) : props.user.user ? (
          <p>you have 0 points</p>
        ) : (
          <Link className="header-link" to="/login">
            <img
              className="login-link"
              src="https://img.icons8.com/ios/50/000000/user--v1.png"
            />
          </Link>
        )}
        {location.pathname !== "/" ? (
          <Link className="header-link" to="/">
            <img
              className="home-link"
              src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/000000/external-skateboard-active-lifestyle-kmg-design-detailed-outline-kmg-design.png"
            />
          </Link>
        ) : null}
        {location.pathname !== "/cart" ? (
          <Link className="header-link" to="cart">
            <img
              className="cart-image"
              src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png"
            />
          </Link>
        ) : null}
      </div>
      <hr className="line-break" />
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser })(Header);
