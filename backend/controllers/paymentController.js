// import { instance  } from "../server.js";

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {instance}= require("../server.js")
const crypto = require("crypto")
const Razorpay = require("razorpay")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

exports.checkout = catchAsyncErrors(async(req,res,next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
}
console.log("hiii")
const instance = new Razorpay({
  key_id:process.env.RAZORPAY_API_KEY,
  key_secret:process.env.RAZORPAY_SECRET_KEY
}) 
const order = await instance.orders.create(options);

res.status(200).json({
  success: true,
  order,
});
})

exports.keygenerate = catchAsyncErrors(async(req,res,next)=> {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

exports.paymentverification = catchAsyncErrors(async(req,res,next)=> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
  .update(body.toString())
  .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;

if (isAuthentic) {
  // Database comes here


  await Payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  res.redirect(
    `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  );
} else {
  res.status(400).json({
    success: false,
  });
}
})