import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "./actions/productAction";
import { getAllOrders } from "./actions/orderAction";
import { getAllUsers } from "./actions/userAction";
import MetaData from "./layout/MetaData";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const keyword=''

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    let navigate = useNavigate()
    const handleonClick = ()=>{
      navigate("/productlist", {state:{keyword}})
  }
  // const lineState = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["tomato"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        {/* <h1>hii</h1> */}
        {/* console.log("hiii") */}

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <div className="productlistss" onClick={handleonClick}>
              <p>Product</p>
              <p>{products && products.length}</p>
            </div> 
             <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;