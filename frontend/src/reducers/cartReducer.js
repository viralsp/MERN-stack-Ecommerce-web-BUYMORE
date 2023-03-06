import{
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_ERRORs,
    SAVE_SHIPPING_INFO,
} from "../constants/productConstants"

export const cartReducer = (state={cart:[]}, action)=>{
    switch (action.type) {
        case ADD_TO_CART :
            return{ cart:[...state.cart,{...action.payload,qty:1}]}
        case REMOVE_FROM_CART :
            // console.log('reducer**', action)
            return{
                cart:state.cart.filter((c)=> c._id !== action.payload._id)
            }
        case "CHANGE_CART_QTY":
            console.log("hii")
            return {
                cart:state.cart.filter((c) => c._id===action.payload._id?(c.qty=action.payload.qty):(c.qty))
            }
        case CLEAR_ERRORs :
            return{
                ...state,
                error:null
            }

            case SAVE_SHIPPING_INFO:
                return {
                  ...state,
                  shippingInfo: action.payload,
                };
    
        default:
            return state
    }
 };