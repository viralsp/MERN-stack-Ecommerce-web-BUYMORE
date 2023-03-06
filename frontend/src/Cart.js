import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./Cart.css"
import CartCard from './CartCard';
import Footer from "./Footer"
import Header from './Header';
import {useNavigate} from "react-router-dom"

function Cart() {
    const {cart}= useSelector((state)=>state.cart);

    const [total, settotal] = useState()

    useEffect(() => {
      settotal(cart.reduce((acc, curr)=> acc + Number(curr.price)*curr.qty,0))
    }, [cart])
    
//loading,error,
    const {   isAuthenticated } = useSelector(
      (state) => state.user
    );

    let navigate = useNavigate()
    const checkoutHandler = () => {
      //history.push("/login?redirect=shipping");
      if (isAuthenticated) {
        navigate(`/shipping`);
      }
      else {
        navigate(`/login`)
      }
    };
  

  return (
    <>
    <Header/>
    <div className='cart'>
      <div className='cart-left'>
        {cart.map((prod)=>
            <CartCard key={prod._id} product={prod}/>
        )}
      </div>
      <div className='cart-right'>
        <span>SubTotal of ({cart.length}) Items</span>
        <span style={{fontWeight:700,fontSize:20}}>Total ₹ {total} </span>
        <button disabled={cart.length===0} onClick={checkoutHandler}>Proceed to Checkout</button>
      </div>
    </div>
    <Footer/>
    </>
    )
}

export default Cart