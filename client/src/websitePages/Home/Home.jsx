// "use client";
// import { Button } from "antd";
// import { useRouter } from "next/navigation";

import ExclusiveOfferSection from "@/components/exclusiveOfferSection/ExclusiveOfferSection";
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

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* homeCrousel section is start from here */}
      <div className="mt-[100px]">
        <HomeCarousel heroCarouselAllImgs={heroCarouselAllImgs} />
      </div>
      {/* homeCrousel section is end here */}

      {/* Best SellerSection is Start from here */}
      <div className="mt-[100px]">
        <p className="font-Roboto text-[26px] sm:text-[30px] md:text-[50px] text-darkGreen text-center">
          Featured Products
        </p>
        {/* card Container*/}
        <div
          className={`mt-[20px] md:mt-[50px] grid ${getAllFeaturedProductsData?.length == 0 ? "grid-cols-1" : getAllFeaturedProductsData?.length == 1 ? "grid-cols-1 px-0 xs:px-[10%] sm:px-[15%] md:px-[30%]" : getAllFeaturedProductsData?.length == 2 ? "grid-cols-1 sm:grid-cols-2 px-0 md:px-[5%]" : "grid-cols-1 px-0 xs:px-[10%] sm:px-[15%] md:px-0 md:grid-cols-3"} gap-[60px] md:gap-[20px] lg:gap-[40px]`}
        >
          {/* card is start from  here  */}
          {getAllFeaturedProductsData?.length > 0 ? (
            getAllFeaturedProductsData?.map((prod, ind) => (
              <Link
                key={ind}
                href={`/productDetail/${prod?.id}`}
                className="cursor-pointer border border-gray-200 rounded-sm"
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
                  <p className="font-Poppins text-[18px] text-center text-darkGray bolder font-bold">
                    {/* {datavalue} */}
                    {prod?.product_name}
                  </p>
                  <div className="mt-[10px] grid grid-cols-3 items-center justify-center">
                    <p className="font-Poppins text-[18px] text-textLightGray text-end">
                      {prod?.sellproduct_price_1kg}
                    </p>
                    <p className="flex justify-center items-center">|</p>
                    <p className="font-Poppins  text-[18px] text-textLightGray ">
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
           <Link
            href={"/allProducts"}
            className="py-[10px] px-[60px] rounded-sm bg-lightGreen text-[22px] font-Poppins"
          >
            See All
          </Link> 
        </div> */}
      </div>
      {/* Best Seller Section is end here */}

      {/* our all Products Section is start from here */}
      <div className="mt-[100px]">
        <OurProducts heroSectionAllProducts={heroSectionAllProducts} />
      </div>
      {/* our Products Section is end here */}

      {/* Exclusive Offer Section is start from here */}
      <ExclusiveOfferSection />
      {/* Exclusive Offer Section is end here */}

      {/* <Button type="primary" onClick={() => router.push("/admin")}>
        Admin Dashboard
      </Button> */}
    </div>
  );
};

export default Home;
