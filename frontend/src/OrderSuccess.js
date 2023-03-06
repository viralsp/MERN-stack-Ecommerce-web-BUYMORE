import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <h1>Your Order has been Placed successfully </h1>
      <Link to="/orders">View Orders</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default OrderSuccess;