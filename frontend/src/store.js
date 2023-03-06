import {createStore ,combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { productReducer } from "./reducers/productReducer";
import {categoryReducer} from "./reducers/categoryReducer"
import { userReducer} from "./reducers/userReducer"
import {profileReducer} from "./reducers/userReducer"
import {forgotPasswordReducer} from "./reducers/userReducer"
import {cartReducer} from "./reducers/cartReducer"
import { allUsersReducer } from "./reducers/userReducer";
import {userDetailsReducer} from "./reducers/userReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
  } from "./reducers/orderReducer";
  import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
  } from "./reducers/productReducer";

const reducer = combineReducers({
    products:productReducer,
    categorys:categoryReducer,
    user : userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    cart:cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState={
  cart:{
    cart:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
  },
}

const middleware=[thunk]

const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store