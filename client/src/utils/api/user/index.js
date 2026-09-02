const userEndPoints = {
  // user auth routes is start rom here
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
  // user auth routes is start rom here

  // heroPage route is start from here
  getHeroSectionAllProducts: "/user/products/getHeroSectionAllProducts",
  getAllHeroCarouselImgs: "/user/carouselImgs/getAllHeroCarouselImgs",
  getAllFeaturedProducts: "/user/products/getAllFeaturedProducts",
  // heroPage route is end here

  // AllProducts page route is start from here
  getAllProducts: "/user/products/getAllProducts",
  getInfiniteScrollingProducts: "/user/products/getInfiniteScrollingProducts",

  // AllProducts page route is end here

  // categories route is start from here
  getAllCategories: "/user/categories/getAllCategories",

  // categories route is end here
};
export { userEndPoints };
