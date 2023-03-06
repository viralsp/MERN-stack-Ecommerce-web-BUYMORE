import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchIcon from "@material-ui/icons/Search"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {useNavigate} from "react-router-dom"
import './Header.css'
import {useSelector} from "react-redux"



function Header() {
//loading,error,
    const { user,  isAuthenticated } = useSelector(
        (state) => state.user
      );
    
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const {cart} =useSelector((state)=>state.cart);

    const handleChange = (event)=>{
        setKeyword(event.target.value)
        
    }
    const handleonClick = ()=>{
        navigate("/productlist", {state:{keyword}})
    }

    useEffect(()=>{

    },[cart])
  return (
    <nav className='header'>
        <Link to='/' className='header__logo__container'>
            <h1 className='header__logo'>BUY<small className='logo-small'>More</small></h1>
            <i class="fas fa-shopping-cart"></i>
            {/* <img className='header__logo' src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon-logo'/> */}
        </Link>
        <div className='header__search'>
            <input className='header__searchInput' value={keyword} onChange={handleChange} />
            <SearchIcon onClick={()=>{handleonClick()}} className='header__searchIcon'  /> 
        </div>
        <div className='header__nav'>
            <Link to='/login' className='header__link'>
            {isAuthenticated?(<div id="registerImage" className='header_profile_image'>
                  <img src={user.avatar.url} alt="Avatar Preview" />
                  </div>):(<div className='header__option'>
                    <span className='header__optionLineOne'>Hello</span>
                    <span  className='header__optionLineTwo'>Sign In</span>
                    
                </div>)}
                
            </Link> 
            {/* <Link to='/' className='header__link'>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Returns </span>
                    <span className='header__optionLineTwo'>& Orders</span>
                </div>
            </Link>  */}
            {/* <Link to='/' className='header__link'>
                <div className='header__option'>
                    <span className='header__optionLineOne'>Your</span>
                    <span className='header__optionLineTwo'>Prime</span>
                </div>
            </Link>  */}
            <Link to='/cart' className='header__link'>
                <div className='header__optionBasket'>
                    <ShoppingBasketIcon/>
                    <span className='header__optionLineTwo header__basketCount'>{cart.length}</span>
                </div>
            </Link>
        </div>
    </nav>  
  )
}

export default Header