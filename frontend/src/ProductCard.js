import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import "./ProductCard.css"


function ProductCard({product}) {

    const options = {
        edit : false,
        color: "rgba(20 ,20, 20, 0.1)",
        activeColor:"yellow",
        size:window.innerWidth < 600? 20 : 25,
        value:product.rating,
        isHalf:true,
    }
    

    function truncate(str, n){
        return str?.length>n?str.substr(0, n-1)+"...":str;
    }
  return (
    <Link  to={`/product/${product._id}`} state={product} className='product-card-link' >
        <div className='product-card'>
            <div className='product-card-img'>
                <img src={product.images[0].url} alt={truncate(product.name,25)} ></img>
            </div>
            <div className='product-card-info'>
                <div className="product-card-name">
                     <h2 className='product-card-title'>{truncate(product.name,150)}</h2>
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
  )
}

export default ProductCard
