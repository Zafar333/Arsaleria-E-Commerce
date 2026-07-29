const adminEndpoints={

  //  admin logout route is start from here
    adminLogout:"/admin/logout",
  //  admin logout route is end here

  
  // get all users or customers route is start from here
  getAllCustomersData:"/admin/getAllCustomersData",
  getSearchCustomersData:"/admin/getSearchCustomersData",
  // get all users or customers route is end here


    adminProfile:"/admin/profileDetail",
    adminAddCategories:"/admin/addProductCategories",
    adminGetAllCategories:"/admin/getAllCategories",
    adminGetAllBottomCategories:"/admin/getAllBottomCategories",
    adminDeleteCategories:"/admin/deleteCategorie",

    // add product routes : this all routes for add product in the backend also upload on the cloud cloudinary
    addProductGeneratePreSignedUrl:"/admin/addProductGeneratePreSignedUrl",
    adminaddProduct:"/admin/addProduct",
    adminDeleteHalfFailFileFromCloudinary:"/admin/api/cloudinary/delete-halfUploadedFile",
    // add product routes : this all routes for add product in the backend also upload 
    // on the cloud cloudinary end here

    // adminGetAllProducts route is start from here
    adminGetAllProducts:"/admin/getAllProducts",
    getInStockProducts:"/admin/getInStockProducts",
    getOutofStockProducts:"/admin/getOutofStockProducts",
    getSearchFilterAllProducts:"/admin/getSearchFilterAllProducts",
    // adminGetAllProducts route is end here

      // adminDeleteProduct route is start from here
    adminDeleteProduct:"/admin/adminDeleteProduct"
    // adminDeleteProduct route is end here



}
module.exports ={adminEndpoints}