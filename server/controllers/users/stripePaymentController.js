const Stripe =require("stripe");
require ("dotenv").config();



const stripePaymentController = async(req,res) => {
    // return console.log("hello stripe")
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g. 1000 = $10
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({status:200, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.json({status:500, message: err.message });
  }
}

module.exports={stripePaymentController}