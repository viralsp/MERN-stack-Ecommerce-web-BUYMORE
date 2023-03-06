import React, { useState } from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import { removeToCart } from './actions/cartAction';
import {  useDispatch} from "react-redux"


import "./CartCard.css"
// import e from 'express';



function CartCard({product}) {
    const options = {
        edit : false,
        color: "rgba(20 ,20, 20, 0.1)",
        activeColor:"yellow",
        size:window.innerWidth < 600? 20 : 25,
        value:product.rating,
        isHalf:true,
    }
    
    function truncate(str, n){
        return str.length > n ?str.substr(0, n-1)+"...":str;
    }

    const dispatch = useDispatch();

    const [qty, setqty] = useState(1)

  return (
    <div className='cart-card-main'>
        <Link to={`/product/${product._id}`} state={product} className='cart-card-link' >
            <div className="cart-card">
                <div className='cart-card-img'>
                    <img src={product.images[0].url} alt={truncate(product.name,25)} ></img>
                </div>
                <div className=' cart-card-info'>
                        <div className="product-card-name">
                            <h2 className='product-card-title'>{truncate(product.name,100)}</h2>
                        </div>
                        <div className='product-card-rating'>
                            <ReactStars {...options}/>
                            <span>({product.numOfReviews} Reviews)</span>
                        </div>
                        <p className='product-card-price'>
                                <small>₹</small>
                                <strong>{product.price}</strong>
                        </p>
                 </div>

            </div>
        </Link>
        <div style={{display:"flex"}}>
        <div className='cart-card-qty'>
            {qty>1 ?( <button  onClick={()=>{
                setqty(qty-1)
                dispatch({
                    type:"CHANGE_CART_QTY",
                    payload:{
                        _id:product._id,
                        qty:qty-1
                    }
                })
            }}>-</button>):( <button disabled="true" onClick={()=>{
                setqty(qty-1)
            }}>-</button>) }
            <input value={qty}  type="number"  onChange={()=>{
                dispatch({type:"CHANGE_CART_QTY" , payload:{
                    _id:product._id,
                    qty:{qty}
                }})
                
            }}/>
            {qty<product.Stock?( <button onClick={()=>{
                setqty(qty+1)
                dispatch({
                    type:"CHANGE_CART_QTY",
                    payload:{
                        _id:product._id,
                        qty:qty+1
                    }
                })
            }}>+</button>):( <button disabled="true" onClick={()=>{
                setqty(qty+1)
            }}>+</button>)}
           
        </div>
        <div className='cartCard-btn'>
                <i onClick={() => {dispatch(removeToCart(product))}} className="fa-solid fa-trash"></i>
                </div>
        </div>

    </div>
    )
}

export default CartCard