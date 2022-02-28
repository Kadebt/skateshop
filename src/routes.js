import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart";
import Dashboard from "./components/Dashboard";
import Shop from "./components/shop";
import Review from "./components/reviews";
import Fullitem from "./components/fullitem";
import Register from "./components/register";
import Login from "./components/Auth";
import Payment from "./components/Payment";

export default (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/shop/:id" element={<Shop />} />
    <Route path="/reviews" element={<Review />} />
    <Route path="/fullitem/:id" element={<Fullitem />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/payment" element={<Payment />} />
  </Routes>
);
