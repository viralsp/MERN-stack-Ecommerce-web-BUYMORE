import{
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORs
} from "../constants/productConstants"






export const categoryReducer = (state={categorys:[]}, action)=>{
    // console.log('sjsdjs', action)
    switch (action.type) {
        case ALL_CATEGORY_REQUEST :
            return{
                loading:true,
                categorys:[]
            }
        case ALL_CATEGORY_SUCCESS :
            return{
                loading:false,
                categorys:action.payload.categoryProducts,
                productsCount:action.payload.productsCount,
                resultPerPage:action.payload.resultPerPage
                // categoryCount:action.payload.categoryCount
            }
        case ALL_CATEGORY_FAIL :
            // console.log('reducer****', action)
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORs :
            return{
                ...state,
                error:null
            }
    
        default:
            return state
    }
 };