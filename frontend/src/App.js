import React from 'react'
import { useEffect, useState } from "react";
// import WebFont from "webfontloader";
import store from "./store";
import { loadUser } from "./actions/userAction";
import axios from "axios";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import Home from './Home';
import Productlist from './Productlist';
import Categorylist from './Categorylist';
import ProductDetails from './ProductDetails';
import LoginSignUp from './LoginSignUp';
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import ResetPassword from './ResetPassword';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import Cart from "./Cart"
import Shipping from './Shipping';
import ConfirmOrder from './ConfirmOrder';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import MyOrders from './MyOrders';
import Dashboard from './Dashboard'
import ProtectedRoute from './ProtectedRoute';
import {useNavigate} from 'react-router-dom'
import NewProduct from './NewProduct';
import ProcessOrder from './ProcessOrder';
import OrderList from './OrderList';
import UsersList from './UsersList';
import UpdateUser from './UpdateUser';
import OrderSuccess from './OrderSuccess';
import OrderDetails from './OrderDetails'
import ProductReviews from './ProductReviews';
import Payment1 from './payment1';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  // let navigate=useNavigate()

  useEffect(() => {
    // WebFont.load({
    //   google: {
    //     families: ["Roboto", "Droid Sans", "Chilanka"],
    //   },
    // });

    // if (user.role==="admin") {
    //   navigate(`/admin/dashboard`);
    // }

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product/:id' element={<ProductDetails/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/login' element={<LoginSignUp />}></Route>
          <Route path='/productlist' element={<Productlist/>}></Route>
          <Route path='/categorylist/:category' element={<Categorylist/>}></Route>
          <Route path='/password/forgot' element={<ForgotPassword />}></Route>
          <Route path='/me' element={<Profile />}></Route>
          <Route path='/password/reset/:token' element={<ResetPassword />}></Route>
          <Route path='/password/update' element={<UpdatePassword />}></Route>
          <Route path='/me/update' element={<UpdateProfile />}></Route>
          <Route path='/shipping' element={<Shipping />}></Route>
          <Route path='/order/confirm' element={<ConfirmOrder />}></Route>
          <Route path='/orders' element={<MyOrders />}></Route>
          <Route isAdmin={true} path='/admin/dashboard' element={<Dashboard />}></Route>
          <Route path='/process/payment' element={<Payment1/>}></Route>
          <Route path='/admin/products' element={<Productlist />}></Route>
          <Route path='/admin/product' element={<NewProduct />}></Route>
          <Route path='/admin/order/:id' element={<ProcessOrder />}></Route>
          <Route path='/admin/orders' element={<OrderList />}></Route>
          <Route path='/admin/users' element={<UsersList />}></Route>
          <Route path='/admin/user/:id' element={<UpdateUser />}></Route>
          <Route path='/success' element={<OrderSuccess />}></Route>
          <Route path='/order/:id' element={<OrderDetails />}></Route>
          <Route path='/admin/reviews' element={<ProductReviews />}></Route>

          {/* {isAuthenticated && <UserOptions user={user} />} */}

      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={Payment} />
        </Elements>
      )} */}
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
