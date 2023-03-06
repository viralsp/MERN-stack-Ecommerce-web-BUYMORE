import React from 'react'
import './Product.css'
import ReactStars from "react-rating-stars-component"
//,useNavigate
import {Link} from "react-router-dom"
import {addToCart,removeToCart} from "./actions/cartAction"
import {useSelector, useDispatch} from "react-redux"





function Product({product}) {
    // const navigate = useNavigate();
    const dispatch =useDispatch();
    const options = {
        edit : false,
        color: "rgba(20 ,20, 20, 0.1)",
        activeColor:"yellow",
        size:window.innerWidth < 600? 20 : 25,
        value:product.ratings,
        isHalf:true,
    }

    const {cart} = useSelector((state)=>state.cart);

    function truncate(str, n){
        return str?.length>n?str.substr(0, n-1)+"...":str;
    }
    //  const handleClick =()=>{
    //     console.log("helloooooooo")
    //     navigate(`/product/${product._id}`, {state:{product}})
    //  }
  return (
      <div className='product'>
            <Link className='productCard' to={`/product/${product._id}`} state={product}>
            <div className='product__info'>
                <div className='product__title'>
                    <p>{truncate(product.name,25)}</p>
                </div>
                <div>
                <p className='product__price'>
                        <small>₹</small>
                        <strong>{product.price}</strong>
                 </p>
                </div>
                <div className='product__rating'>
                    <ReactStars {...options}/>
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
            </div>
            <div className='img_div'>
                <img className="product_image"src={product.images[0].url} alt={truncate(product.name,25)}/>
            </div>
    </Link>
    {
            cart.some((p)=>p._id===product._id)?( <button style={{backgroundColor:"tomato"}} onClick={() => {dispatch(removeToCart(product))}}>Remove from Cart</button>):(<button onClick={() => {dispatch(addToCart(product))}}>Add to Cart</button>)
        }
    </div>

  )
}

export default Product