"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BuyNowSingleProductComponent from "./BuyNowSingleProductComponent";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const BuyNowSingleProductPayemntProvider = () => {
  return (
    <div>
      {" "}
      <Elements stripe={stripePromise}>
        <BuyNowSingleProductComponent />
      </Elements>
    </div>
  );
};

export default BuyNowSingleProductPayemntProvider;
