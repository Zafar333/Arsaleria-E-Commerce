import ProductDetailPageImgAndImgSlider from "@/components/productDetailImgAndImgSlider/ProductDetailPageImgAndImgSlider";
import ProductDetailSizeMenu from "@/components/productDetailSizeMenu/ProductDetailSizeMenu";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import ProductDetailAddToCartButton from "./productDetailPageButtons/ProductDetailAddToCartButton";
import ProductDetailBuyNowButton from "./productDetailPageButtons/ProductDetailBuyNowButton";

const ProductDetail = async ({ params }) => {
  // getSingleProductDetailData fun is start from here
  const { id } = await params;
  let singleProductDetailData = [];
  const getSingleProductDetailData = async () => {
    try {
      if (id) {
        const res = await fetch(
          `${DevelopmentBaseUrl}${userEndPoints?.getSingleProductData}/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          },
        );

        const result = await res.json();
        if (result?.status >= 200 && result?.status < 400) {
          return result?.data;
        }
        if (result?.status >= 400 && result?.status <= 550) {
          return [];
        }
      }
      return [];
    } catch (error) {
      return [];
    }
  };
  singleProductDetailData = await getSingleProductDetailData();
  console.log("singleProductDetailData", singleProductDetailData);
  // getSingleProductDetailData fun is end here

  return (
    <div className="mt-[100px] max-w-[1400px] m-auto min-h-[50vh]">
      {/* productDetail section is sstart from here */}
      {singleProductDetailData?.length > 0 ? (
        <div className="flex flex-col xl:flex-row gap-[20px] xl:gap-[100px] border border-red-600 ">
          {/* product Card is start from here */}
          <div className="flex flex-col gap-[10px] max-w-[750px] xl:min-w-[550px] h-fit rounded-sm border border-black ">
            <div>
              <p className="font-Poppins text-[22px] text-darkGreen">
                {singleProductDetailData[0]?.product_name}
              </p>
            </div>
            {/* img card componenet is start from here */}
            <ProductDetailPageImgAndImgSlider
              singleProductDetailData={singleProductDetailData}
            />
            {/* img card componenet is end here */}
          </div>
          {/* product Card is end here */}

          {/* productDescriptionDetail section is start from here */}
          <div className="flex flex-col py-0 xl:py-[36px] px-[10px]  gap-[30px] ">
            <div className="flex items-center">
              <p className="">
                {singleProductDetailData[0]?.product_discount > 0 && (
                  <span className="text-gray-500 line-through text-[12px] md:text-[14px] font-Poppins mr-3">
                    {singleProductDetailData[0]?.sellproduct_price_1kg}
                  </span>
                )}
              </p>
              <p className="text-darkGreen text-[18px] sm:text-[20px] md:text-[24px] font-Poppins">
                {singleProductDetailData[0]?.product_discount > 0
                  ? `${
                      (singleProductDetailData[0]?.sellproduct_price_1kg *
                        singleProductDetailData[0]?.product_discount) /
                      100
                    } Rs`
                  : `${singleProductDetailData[0]?.sellproduct_price_1kg}  Rs`}
              </p>
            </div>

            <div className="flex items-center gap-2 ">
              <p className="text-darkGreen text-[18px] sm:text-[20px] md:text-[24px] font-Poppins">
                Status :
              </p>
              {singleProductDetailData[0]?.product_variants[0]?.quantity > 0 ? (
                <p className="text-lightGreen text-[18px] sm:text-[20px]  md:text-[22px] font-Poppins">
                  In Stock
                </p>
              ) : (
                <p className="text-lightGreen text-[18px] sm:text-[20px] md:text-[22px] font-Poppins">
                  Not Avalable
                </p>
              )}
            </div>
            <ProductDetailSizeMenu
              singleProductDetailData={singleProductDetailData}
            />

            <div className="">
              <p className="text-darkGreen text-[20px] md:text-[24px]">
                Description
              </p>
              <p className="px-[5px] text-textLightGray text-[12px] xs:text-[16px] font-light">
                {singleProductDetailData[0]?.product_description}
              </p>
            </div>
            <ProductDetailBuyNowButton />
            <ProductDetailAddToCartButton />
          </div>
          {/* productDescriptionDetail section is end here */}
        </div>
      ) : (
        <div className="h-[40vh] flex justify-center items-center">
          <p className="text-[15px] text-darkGreen font-Poppins ">
            No product found
          </p>
        </div>
      )}

      {/* similar products section is start from here */}
      {/* <div className='mt-[100px]  '>
                <p className='text-[24px] text-darkGreen mb-[30px]'>Similar Products</p>
                <div className='grid grid-cols-4 gap-[20px]'>
                    <AllProductsCardImg/>
                </div>
            </div> */}
      {/* similar products section is start from here */}
    </div>
  );
};

export default ProductDetail;
