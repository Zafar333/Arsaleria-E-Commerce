// "use client";
// import { Button } from "antd";
// import { useRouter } from "next/navigation";

import ExclusiveOfferSection from "@/components/exclusiveOfferSection/ExclusiveOfferSection";
import HomeCarousel from "@/components/homePageCarousel/HomeCarousel";
import OurProducts from "@/components/ourProducts/OurProducts";

import Link from "next/link";
// import { useState } from "react";

const Home = ({ heroSectionAllProducts, heroCarouselAllImgs }) => {
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
        <p className="font-Roboto text-[40px] md:text-[50px] text-darkGreen text-center">
          Best Featured
        </p>
        {/* card Container*/}
        <div className="mt-[20px] md:mt-[50px] grid grid-cols-1 md:grid-cols-3 gap-[60px] md:gap-[20px] lg:gap-[40px]">
          {/* card */}
          {/* loop is apply this div */}
          <Link href={`/productDetail/${2}`} className="cursor-pointer">
            <div className=" bg-grayGreen h-[400px] xl:h-[550px] rounded-sm">
              <img
                src="./homepageImgs/7.webp"
                className="w-full h-full object-center md:object-cover lg:object-contain"
              />
            </div>
            {/* card text Content */}
            <div className="mt-[10px]">
              <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">
                product name
              </p>
              <div className="grid grid-cols-3">
                <p className="font-Poppins text-[18px] text-textLightGray text-end">
                  $38.9
                </p>
                <p className="flex justify-center items-center">|</p>
                <p className="font-Poppins text-[18px] text-textLightGray ">
                  5.0
                </p>
              </div>
            </div>
          </Link>
          {/* card text Content */}
          {/* loop is apply this div */}
          {/* {card} */}

          {/* card */}
          {/* loop is apply this div */}
          <Link href={`/productDetail/${2}`} className="cursor-pointer">
            <div className=" bg-grayGreen h-[400px] xl:h-[550px] rounded-sm">
              <img
                src="./homepageImgs/4.webp"
                className="w-full h-full object-center md:object-cover lg:object-contain"
              />
            </div>
            {/* card text Content */}
            <div className="mt-[10px]">
              <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">
                product name
              </p>
              <div className="grid grid-cols-3">
                <p className="font-Poppins text-[18px] text-textLightGray text-end">
                  $38.9
                </p>
                <p className="flex justify-center items-center">|</p>
                <p className="font-Poppins text-[18px] text-textLightGray">
                  5.0
                </p>
              </div>
            </div>
          </Link>
          {/* card text Content */}
          {/* loop is apply this div */}
          {/* {card} */}

          {/* card */}
          {/* loop is apply this div */}
          <Link href={`/productDetail/${2}`} className="cursor-pointer">
            <div className=" bg-skyBlue h-[400px] xl:h-[550px] rounded-sm">
              <img
                src="./homepageImgs/2.webp"
                className="w-full h-full object-center md:object-cover lg:object-contain"
              />
            </div>
            {/* card text Content */}
            <div className="mt-[10px]">
              <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">
                product name
              </p>
              <div className="grid grid-cols-3">
                <p className="font-Poppins text-[18px] text-textLightGray text-end">
                  $38.9
                </p>
                <p className="flex justify-center items-center">|</p>
                <p className="font-Poppins text-[18px] text-textLightGray">
                  5.0
                </p>
              </div>
            </div>
          </Link>
          {/* card text Content */}
          {/* loop is apply this div */}
          {/* {card} */}
        </div>
        {/* card Container */}
        <div className="flex justify-center mt-[80px]">
          <Link
            href={"#"}
            className="py-[10px] px-[60px] rounded-sm bg-lightGreen text-[22px] font-Poppins"
          >
            See All
          </Link>
        </div>
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
