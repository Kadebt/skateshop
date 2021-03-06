import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { loginUser } from "../ducks/reducer";
import { connect } from "react-redux";
import "./styling/auth.css";

const Auth = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const body = {
      email: email,
      password: password,
    };
    axios
      .post("/auth/login", body)
      .then((res) => {
        console.log(navigate);
        props.loginUser(res.data);
        navigate("/");
      })
      .catch((err) => {
        alert("Could not log in");
      });
  };

  return (
    <div className="login-wrapper">
      <div>
        <h1 className="login-header">Login</h1>
        <div>
          <input
            className="input"
            maxLength="100"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            className="input"
            type="password"
            maxLength="20"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="login"
          onClick={() => {
            handleLogin();
          }}
        >
          Log in
        </button>
      </div>
      <Link className="auth-link" to="/register">
        Register Here
      </Link>
      <Link className="auth-link" to="/">
        Continue shopping without earning points
      </Link>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { loginUser })(Auth);
