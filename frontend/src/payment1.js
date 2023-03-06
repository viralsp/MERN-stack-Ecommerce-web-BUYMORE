import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "./actions/orderAction";
import {useNavigate} from "react-router-dom"
import GooglePayButton from '@google-pay/button-react';


const Payment1=({history})=> {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
  const alert = useAlert();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
 const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  let navigate = useNavigate()
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    user:user._id,
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const result={
        billing_details: {
        shippingInfo: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          pinCode: shippingInfo.pinCode,
          country: shippingInfo.country,
          phoneNo:shippingInfo.phoneNo,
        },
      }
    }
    // if (result.paymentIntent.status === "succeeded") {
    //     order.paymentInfo = {
    //       id: result.paymentIntent.id,
    //       status: result.paymentIntent.status,
    //     };
    dispatch(createOrder(order));
    navigate(`/success`)
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
//   const result = {
    // billing_details: {
    //   name: user.name,
    //   email: user.email,
    //   address: {
    //     line1: shippingInfo.address,
    //     city: shippingInfo.city,
    //     state: shippingInfo.state,
    //     postal_code: shippingInfo.pinCode,
    //     country: shippingInfo.country,
    //   },
    // },
//   }

// if (result.error) {
// console.log("error")

//   alert.error(result.error.message);
// } else{
//     order.paymentInfo = {
//     //   id: result.paymentIntent.id,
//     //   status: result.paymentIntent.status,
//     };

//     dispatch(createOrder(order));
//   navigate(`/success`)
//   }
    
  return (
    <div className="payment">
      <h1 className="pay"> Payment</h1>
      <hr />
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
      />
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div >
            <CreditCardIcon />
            <input className="paymentInput" placeholder="Card Number"/>
          </div>
          <div>
            <EventIcon />
            <input className="paymentInput" placeholder="Expiry date"/>
          </div>
          <div>
            <VpnKeyIcon />
            <input className="paymentInput" placeholder="CVV"/>
          </div>
        </form>
      <input
            type="submit"
            onClick={submitHandler}
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn"
          />
      
    </div>
    
  );
}

export default Payment1;