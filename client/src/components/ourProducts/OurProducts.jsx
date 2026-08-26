import Image from "next/image";
import Link from "next/link";
import OurProductSectionSeeAllButton from "../ourProductSectionSeeAllButton/OurProductSectionSeeAllButton";

const OurProducts = ({ heroSectionAllProducts }) => {
  // console.log("heroSectionAllProducts", heroSectionAllProducts);
  return (
    <div>
      <p className="font-Roboto text-[30px] md:text-[50px] text-darkGreen text-center">
        Our Products
      </p>
      {/* Trendig Products Button section is start from here */}
      {/* <TrendingProductsButtons /> */}
      {/* Trendig Products Button section is end here */}

      <div className="mt-[20px] md:mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[60px] md:gap-[20px] lg:gap-[40px]">
        {/* card is start from  here  */}
        {heroSectionAllProducts?.length > 0 ? (
          heroSectionAllProducts?.map((prod, ind) => (
            <Link
              key={ind}
              href={`/productDetail/${prod?.id}`}
              className="cursor-pointer border border-gray-200 rounded-sm"
            >
              <div className=" bg-whiteGray h-[300px] rounded-sm">
                <Image
                  alt="Image"
                  width={310}
                  height={200}
                  src={prod?.media[0]?.secure_url}
                  className="w-full h-full object-contain "
                />
              </div>
              {/* card text Content */}
              <div className="mt-[10px]">
                <p className="font-Poppins text-[18px] text-center text-darkGray bolder font-bold">
                  {/* {datavalue} */}
                  {prod?.product_name}
                </p>
                <div className="mt-[10px] grid grid-cols-3 items-center justify-center">
                  <p className="font-Poppins text-[18px] text-textLightGray text-end">
                    {prod?.sellproduct_price_1kg}
                  </p>
                  <p className="flex justify-center items-center">|</p>
                  <p className="font-Poppins text-[18px] text-textLightGray ">
                    Rs
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[16px] font-Poppins text-darkGreen">
            No product found"
          </p>
        )}

        {/* {card} is end here */}
      </div>
      <OurProductSectionSeeAllButton />
    </div>
  );
};

export default OurProducts;
