const userEndPoints = {
  login: "/user/auth/login",
  logout: "/user/auth/logout",
  registration: "/user/auth/signup",
  userCheckToken: "/user/auth/checkToken",
  updateForgotPassword: "/user/auth/updateForgotPassword",
  resetPasswordSendOtpEmail: "/user/auth/resetPassword/sendOtpEmail",
  resetPasswordVerifyOtp: "/user/auth/resetPassword/verifyOtp",
  // signin with google route is start from here
  signinWithGoogleBackendAuth: "/user/auth/signinWithGoogle",

  // signin with google route is end here
};
export { userEndPoints };
