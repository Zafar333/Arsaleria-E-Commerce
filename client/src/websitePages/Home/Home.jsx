// "use client";
// import { Button } from "antd";
// import { useRouter } from "next/navigation";

import HomeCarousel from "@/components/homePageCarousel/HomeCarousel";
import OurProducts from "@/components/ourProducts/OurProducts";
import Image from "next/image";

import Link from "next/link";
// import { useState } from "react";

const Home = ({
  heroSectionAllProducts,
  heroCarouselAllImgs,
  getAllFeaturedProductsData,
}) => {
  // const [allProductsData, setAllProducts] = useState([]);
  // const router = useRouter();
  // useEffect(()=>{
  //   setAllProducts(heroSectionAllProducts)
  // },[heroSectionAllProducts])
  // console.log("getAllFeaturedProductsData", getAllFeaturedProductsData);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* homeCrousel section is start from here */}
      <div className="mt-[50px] sm:mt-[70px] md:mt-[100px]">
        <HomeCarousel heroCarouselAllImgs={heroCarouselAllImgs} />
      </div>
      {/* homeCrousel section is end here */}

      {/* Best SellerSection is Start from here */}
      <div className="mt-[50px] sm:mt-[70px] md:mt-[100px]">
        <p className="font-Roboto text-[26px] sm:text-[30px] md:text-[50px] text-darkGreen text-center">
          Featured Products
        </p>
        {/* card Container*/}
        <div
          className={`mt-[20px] md:mt-[50px] grid ${getAllFeaturedProductsData?.length == 0 ? "grid-cols-1" : getAllFeaturedProductsData?.length == 1 ? "grid-cols-1 px-0 xs:px-[10%] sm:px-[15%] md:px-[30%]" : getAllFeaturedProductsData?.length == 2 ? "grid-cols-1 sm:grid-cols-2 px-0 md:px-[5%]" : "grid-cols-1 px-0 xs:px-[10%] sm:px-[15%] md:px-0 md:grid-cols-3"}  gap-[40px] md:gap-[20px] lg:gap-[40px]`}
        >
          {/* card is start from  here  */}
          {getAllFeaturedProductsData?.length > 0 ? (
            getAllFeaturedProductsData?.map((prod, ind) => (
              <Link
                key={ind}
                href={`/productDetail/${prod?.id}`}
                className="cursor-pointer border border-gray-200 rounded-sm "
              >
                <div className=" bg-grayGreen h-[400px] xl:h-[550px] rounded-sm">
                  <Image
                    alt="Image"
                    width={410}
                    height={200}
                    src={prod?.media[0]?.secure_url}
                    className="w-full h-full object-contain "
                  />
                </div>
                {/* card text Content */}
                <div className="mt-[10px]">
                  <p className="font-Poppins text-[14px] sm:text-[16px] md:text-[18px] text-center text-darkGray bolder font-bold">
                    {/* {datavalue} */}
                    {prod?.product_name}
                  </p>
                  <div className="mt-[10px] grid grid-cols-3 items-center justify-center">
                    <p className="font-Poppins text-[14px] sm:text-[16px] md:text-[18px] text-textLightGray text-end">
                      {prod?.product_discount > 0
                        ? Math.round(
                            Number(prod?.sellproduct_price_1kg) -
                              (Number(prod?.sellproduct_price_1kg) *
                                Number(prod?.product_discount)) /
                                100,
                          )
                        : Math.round(Number(prod?.sellproduct_price_1kg))}
                      {/* {prod?.sellproduct_price_1kg} */}
                    </p>
                    <p className="flex justify-center items-center">|</p>
                    <p className="font-Poppins text-[14px] sm:text-[16px] md:text-[18px] text-textLightGray ">
                      Rs
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center items-center h-[300px] bg-grayGreen">
              <p className="text-darkGreen font-Poppins text-[16px] ">
                {" "}
                NO FEATURED PRODUCTS
              </p>
            </div>
          )}
          {/* card */}

          {/* card text Content */}
          {/* {card} */}
        </div>
        {/* card Container */}
        {/* <div className="flex justify-center ">
          <OurProductSectionSeeAllButton />
          
        </div> */}
      </div>
      {/* Best Seller Section is end here */}

      {/* our all Products Section is start from here */}
      <div className="mt-[50px] sm:mt-[70px] md:mt-[100px]">
        <OurProducts heroSectionAllProducts={heroSectionAllProducts} />
      </div>
      {/* our Products Section is end here */}

      <div className="bg-lightGreen px-[10px] xs:px-[25px] md:px-[50px] py-[25px] md:py-[50px] mt-[50px] sm:mt-[70px] md:mt-[100px] ">
        <section className="">
          <div className="py-10 flex flex-col gap-4">
            <h1 className="text-darkGreen font-Poppins ">
              A Little More Goodness in Every Drop
            </h1>

            <p className="text-[14px] text-darkGreen ">
              Bring home the simple goodness of dairy with fresh milk,
              traditional desi ghee and carefully selected dairy essentials.
              Honest taste, everyday freshness, and quality you can enjoy with
              your family.
            </p>
          </div>

          {/* boxes start */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white p-[20px]">
              <div className="flex gap-4">
                <img
                  className="max-h-[50px] md:max-h-[90px] max-w-[50px] md:max-w-[90px] object-contain"
                  src="./content-milk-img.jpg"
                  alt="Fresh dairy milk"
                />
                <div>
                  <h2 className="text-darkGreen font-Poppins text-[10px] md:text-[16px]!">
                    Fresh Milk, Every Day
                  </h2>
                  <p className="text-[10px] sm:text-[14px] text-darkGreen">
                    Enjoy fresh dairy goodness for your everyday needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Second small box */}
            <div className="bg-white p-[20px]">
              <div className="flex gap-4">
                <img
                  src="./ghee.jpg"
                  alt="Desi ghee"
                  className="max-h-[50px] md:max-h-[90px] max-w-[50px] md:max-w-[90px] object-contain"
                />
                <div>
                  <h2 className="text-darkGreen font-Poppins text-[10px] md:text-[16px]">
                    Traditional Desi Ghee
                  </h2>
                  <p className="text-[10px] sm:text-[14px] text-darkGreen">
                    Bring home the rich aroma and familiar taste of traditional
                    desi ghee.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* boxes end */}
        </section>
      </div>

      {/* Exclusive Offer Section is start from here */}
      {/* <ExclusiveOfferSection /> */}
      {/* Exclusive Offer Section is end here */}
    </div>
  );
};

export default Home;
