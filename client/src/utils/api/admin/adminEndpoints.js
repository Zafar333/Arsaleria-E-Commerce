const adminEndpoints={
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
    adminGetAllProducts:"/admin/getAllProducts"
    // adminGetAllProducts route is end here



}
module.exports ={adminEndpoints}