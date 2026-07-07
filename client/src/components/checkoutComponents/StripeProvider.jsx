"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function StripeProvider() {
    // const [paymentMethod, setPaymentMethod] = useState("cod");
  return (
    <Elements stripe={stripePromise}  >
        <CheckoutPage/>
    </Elements>
  );
}