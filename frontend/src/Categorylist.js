import React, { Fragment , useState} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import {useSelector ,  useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { getCategoryProduct } from './actions/categoryAction'
import "./Productlist.css"
import Loader from './layout/Loader/Loader'
import Pagination from "react-js-pagination"





function Categorylist() {
    const alert =  useAlert()
  const dispatch = useDispatch();

  const [currentpage, setcurrentpage] = useState(1)
    // let navigate = useNavigate()
    let location = useLocation()

    const category = location.state.category
 
    const { loading,categorys, error, resultPerPage, productsCount}= useSelector((state)=>state.categorys);

    const setCurrentPageNo = (e)=>{
      setcurrentpage(e)
    }
    console.log('**********',productsCount)
   
  

    useEffect(() => {
      // console.log(error)
      if(error){
        return alert.error(error)
      }
    dispatch(getCategoryProduct(category,currentpage));
    }, [dispatch,error, alert,category , currentpage])


    // console.log(error)
  
    
  return (
    <Fragment>
      {loading?<Loader/>:<div>
    <div className='productlist-header'>
      <h1>{category} List</h1>
    </div>
    {categorys && categorys.map((product)=>(
              <ProductCard product={product}/>))}
    <div className='paginationBox'>
        <Pagination
          activePage={currentpage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={8}
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
  </div>}
    </Fragment>
  )
}

export default Categorylist