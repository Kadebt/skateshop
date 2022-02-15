import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../ducks/cartreducer";
import FullItem from "./fullitem";

const Dashboard = (props) => {
  return (
    <div>
      <Link to="/shop/1">Shop SkateBoards</Link>
      <Link to="/shop/2">Shop Wheels</Link>
      <Link to="/shop/3">Shop Trucks</Link>
      <Link to="/shop/4">Shop Bearings</Link>
      <Link to="/shop/5">Shop HardWare</Link>
      <Link to="/shop/6"> Shop GripTape</Link>
      <Link to="/shop/7">Shop Accessories</Link>
      <Link to="/shop/0">Look Around</Link>
    </div>
  );
};

export default Dashboard;
