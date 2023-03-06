import{
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ALL_CATEGORY_FAIL,
    CLEAR_ERRORs,
    SAVE_SHIPPING_INFO,
} from "../constants/productConstants"

export const addToCart = (product)=> async (dispatch, getState) =>{
    try {
        dispatch({
            type:ADD_TO_CART,
            payload:product
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart))

    } catch (error) {
        dispatch({
            type:ALL_CATEGORY_FAIL,
            payload:error.message
        });
    }
};

export const removeToCart = (product)=> async (dispatch ,getState) =>{
    try {
        dispatch({
            type:REMOVE_FROM_CART,
            payload:product
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart))

    } catch (error) {
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

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
};