import React,{Fragment, useEffect, useState} from 'react'
import Header from './Header'
import Product from './Product'
import "./Home.css"
import Footer from './Footer'
import {getProduct} from "./actions/productAction"
import {useSelector ,  useDispatch} from "react-redux"
import Loader from './layout/Loader/Loader'
import {useAlert} from "react-alert"
import {useNavigate} from "react-router-dom"
import { getCategoryProduct } from './actions/categoryAction'
import axios from 'axios'





function Home() {

  let navigate = useNavigate()
  const alert =  useAlert()
  const dispatch = useDispatch();
  const [laptopData,setLaptop] = useState()
  const [smartData,setSmart] = useState()
  const [otherData,setOthers] = useState()

  const {loading,products, error}= useSelector((state)=>state.products);
  // const {categorys}= useSelector((state)=>state.categorys);
  

   const keyword=''
  // console.log(error)
const fetchData=async ()=>{
    const laptop = await axios.get("/api/v1/category?category=Laptops")
    const smart = await axios.get("/api/v1/category?category=Smarts Phones")
    const other = await axios.get("/api/v1/category?category=Others")
    console.log("lap",laptop.data.categoryProducts)
    console.log("smart",smart.data.categoryProducts)
    console.log("other",other.data.categoryProducts)
     setLaptop(laptop.data.categoryProducts)
     setSmart(smart.data.categoryProducts)
     setOthers(other.data.categoryProducts)

    //  console.log("hgjkjkkll;jlkjkjhjh",laptopData)


  }

  useEffect(() => {
    // console.log(error)
   
    fetchData()
    if(error){
      return alert.error(error)
    }
    dispatch( getProduct(keyword));
   
  }, [dispatch,error, alert])
  
let handleonClick=(category)=>{
  // console.log(category)
  navigate(`/categorylist/${category}`, {state:{category}})
}
  return (
    <Fragment>
      {loading?<Loader/>:   <>
        <Header/>
        <div className='home'>
          <div className='category__bar'>
            <h2>Smarts Phones</h2>
            <button className='view-more-btn' onClick={()=>{handleonClick("Smarts Phones")}}>View more</button>
          </div>
          <div className='home__row'> 
            {smartData && smartData.map((product)=>(
              <Product product={product}/>
            ))}
          </div>
          <div className='category__bar'>
            <h2>Laptops</h2>
            <button className='view-more-btn'onClick={()=>{handleonClick("Laptops")}}>View more</button>
          </div>
          <div className='home__row'> 
          {laptopData && laptopData.map((product)=>(
              <Product product={product}/>))}
   
          </div>
          <div className='category__bar'>
            <h2>others</h2>
            <button className='view-more-btn'onClick={()=>{handleonClick("Others")}}>View more</button>
          </div>
          <div className='home__row'> 
          {otherData && otherData.map((product)=>(
              <Product product={product}/>))}
            </div>
        </div>
        <Footer/>
    </>}
    </Fragment>
  )
}

export default Home