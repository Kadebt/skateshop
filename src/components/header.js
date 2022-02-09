import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { getUser } from "../ducks/reducer";

const Header = (props) => {
  const location = useLocation();

  useEffect(() => {
    axios.get("/auth/check").then((res) => {
      props.getUser(res.data);
    });
  }, []);

  const checkUser = () => {
    if (props.user.user !== undefined) {
      return <Link to="/">Home</Link>;
    } else if (location.pathname === "/login") {
      return null;
    } else {
      return <Link to="/login">Login</Link>;
    }
  };

  const cartCheck = () => {
    if (location.pathname == "/cart") {
      return <Link to="/">Home</Link>;
    } else {
      return <Link to="/cart">Cart</Link>;
    }
  };

  return (
    <div>
      {!!props.user.user
        ? `you have ${props.user.user.points} points`
        : props.user.user
        ? "you have 0 points"
        : "login to earn points"}
      {cartCheck()}
      {checkUser()}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser })(Header);
