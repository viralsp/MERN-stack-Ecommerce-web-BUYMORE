import axios from "axios"


import{
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORs
} from "../constants/productConstants"

export const getCategoryProduct = (category, currentpage=1)=> async (dispatch) =>{
    // console.log(category)
    try {
        dispatch({
            type:ALL_CATEGORY_REQUEST})
        const link = `/api/v1/category?category=${category}&page=${currentpage}`
        const {data} = await axios.get(link)
        // console.log('ccategory ',data)
        dispatch({
            type:ALL_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        // console.log('errorgsdsdb***',error);
        dispatch({
            type:ALL_CATEGORY_FAIL,
            payload:error.message
        });
    }
};


export const clearError = ()=> async (dispatch) =>{
    dispatch({
        type:CLEAR_ERRORs
    })
}