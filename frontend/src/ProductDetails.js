import React, { Fragment, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "./ProductDetails.css"
import ImageSlider from 'react-simple-image-slider';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import {addToCart,removeToCart} from "./actions/cartAction"
import {useSelector, useDispatch} from "react-redux"
import Header from './Header';
import Footer from "./Footer"

const ProductDetails = () => {

    const [qty, setqty] = useState(1)

    let location = useLocation()
    const dispatch =useDispatch();
    const product = location.state
    console.log(product.name)
    const options = {
        edit : false,
        color: "rgba(20 ,20, 20, 0.1)",
        activeColor:"yellow",
        size:window.innerWidth < 600? 20 : 25,
        value:product.ratings,
        isHalf:true,
    }
    function truncate(str, n){
        return str?.length>n?str.substr(0, n-1)+"...":str;
    }
    const {cart} = useSelector((state)=>state.cart);

  return (
    <Fragment>
        <Header />
        <div className='productDetails'>
            
            <div className='productDetails-carousel'>
                <ImageSlider className='imageSlider'
                    width={400}
                    height={300}
                    images={product.images}
                    showBullets={true}
                    showNavs={true}
                    style={{boxShadow:"2px 2px grey"}}
                ></ImageSlider>
            </div>

            <div className='producDetails-info'>
                <div className='detailsBlock-1'>
                    <h2>{truncate(product.name,150)}</h2>
                    <p>Product #{product._id}</p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars {...options}/>
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
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
                        {
            cart.some((p)=>p._id===product._id)?( <button style={{backgroundColor:"tomato"}} onClick={() => {dispatch(removeToCart(product))}}>Remove from Cart</button>):(<button onClick={() => {dispatch(addToCart(product))}}>Add to Cart</button>)
        }
                    </div>
                    <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                            {product.Stock < 1 ? " OutOfStock": " InStock"}
                        </b>
                    </p>
                </div>
                <div className='detailsBlock-4'>
                    Description : <p>{product.description}</p>
                </div>

                <button className='submitReview'>Add Review</button>

            </div>
        </div>
        <h3 className='reviewsHeading'>Reviews</h3>
        {product.reviews && product.reviews[0]?
        (<div className='reviews'>
            {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
        </div>):(
            <p className='noReviews'> No Reviews Yet</p>
        )
        }
        <Footer />
    </Fragment>
  )
}

export default ProductDetails
