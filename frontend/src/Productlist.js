import React, { Fragment, useState } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import {useSelector ,  useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { getProduct } from './actions/productAction'
import "./Productlist.css"
import Loader from './layout/Loader/Loader'
import Pagination from "react-js-pagination"


function Productlist() {
    const alert =  useAlert()
  const dispatch = useDispatch();
    const [currentpage, setcurrentpage] = useState(1)

    // const keyword =''


    // let navigate = useNavigate()
    let location = useLocation()

    const keyword = location.state.keyword
   
    const { loading,products, error, resultPerPage,productsCount}= useSelector((state)=>state.products);

    const setCurrentPageNo = (e)=>{
      setcurrentpage(e)
    }
    console.log(productsCount)

    useEffect(() => {
      // console.log(error)
      if(error){
        return alert.error(error)
      }
      //
        dispatch(getProduct(keyword, currentpage))
      
    }, [dispatch,error, alert, ,keyword ,currentpage])


    // console.log(error)
  
    
  return (
    <Fragment>
      {loading?<Loader/>:<div>
    <div className='productlist-header'>
      <h1>Product List</h1>
    </div>
    {products && products.map((product)=>(
              <ProductCard product={product}/>))}
      <div className='paginationBox'>
        <Pagination
          activePage={currentpage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'
        />
      </div>
  </div>
 
  
  
  
  }

    </Fragment>
  )
}

export default Productlist
