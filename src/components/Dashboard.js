import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../ducks/cartreducer";
import FullItem from "./fullitem";
import "./styling/dashboard.css";

const Dashboard = (props) => {
  return (
    <div className="dash-wrap">
      <div className="link-wrap">
        <Link className="dash-link" to="/shop/1">
          {" "}
          SkateBoards
        </Link>
        <Link className="dash-link" to="/shop/2">
          {" "}
          Wheels
        </Link>
        <Link className="dash-link" to="/shop/3">
          {" "}
          Trucks
        </Link>
        <Link className="dash-link" to="/shop/4">
          {" "}
          Bearings
        </Link>
        <Link className="dash-link" to="/shop/5">
          {" "}
          HardWare
        </Link>
        <Link className="dash-link" to="/shop/6">
          {" "}
          GripTape
        </Link>
        <Link className="dash-link" to="/shop/7">
          {" "}
          Accessories
        </Link>
      </div>
      <Link className="dash-link" to="/shop/0">
        <img
          className="background-img"
          src="https://images.squarespace-cdn.com/content/v1/5d50dde436cf070001ed66ab/1606083752422-MT5NZFI7UG8NZJGXY2BM/Upcountry+Skateshop+Maui%2C+HI?format=1000w"
        />
        <div className="shop-all-link">
          <p>Shop All</p>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
