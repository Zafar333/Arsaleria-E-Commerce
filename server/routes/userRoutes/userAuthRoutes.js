const express = require("express");
const { userSignup } = require("../../controllers/users/userSignupController");
const { userLogin } = require("../../controllers/users/userLoginController");
const {
  signinWithGoogleLoginController,
} = require("../../controllers/users/signinWithGoogleLoginController");
const {
  checkJwtToken,
} = require("../../middleware/userJwtTokens/checkJwtToken");
const {
  userForgotPasswordEmailController,
} = require("../../controllers/users/userForgotPassword/userForgotPasswordEmailController");
const {
  userForgotPasswordVerifyOtpController,
} = require("../../controllers/users/userForgotPassword/userForgotPasswordVerifyOtpController");
const {
  userUpdateForgotPasswordController,
} = require("../../controllers/users/userForgotPassword/userUpdateForgotPasswordController");
const { profileController } = require("../../controllers/users/userController");
const {
  stripePaymentController,
} = require("../../controllers/users/stripePaymentController");
const {
  userLogoutController,
} = require("../../controllers/users/userLogoutController");
const router = express.Router();

// module.exports=()=>{
// login,signup and authentication routes is start from herer
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.patch("/logout", userLogoutController);
router.post("/signinWithGoogle", signinWithGoogleLoginController);
router.post("/checkToken", checkJwtToken);
router.post("/resetPassword/sendOtpEmail", userForgotPasswordEmailController);
router.post("/resetPassword/verifyOtp", userForgotPasswordVerifyOtpController);
router.post("/updateForgotPassword", userUpdateForgotPasswordController);
// login,signup and authentication routes is start from herer
// router.use("/profile",user)

router.post("/profile", profileController);
router.post("/create-payment-intent", stripePaymentController);

module.exports = router;

// return router
// }
