export const dynamic = "force-dynamic";

import AllProductsCardImg from "@/components/allProductsCardImg/AllProductsCardImg";
import AllProductsCrousel from "@/components/allProductsCrousel/AllProductsCrousel";
import AllProductsFilter from "@/components/allProductsFilter/AllProductsFilter";
import AllProductsSearchBar from "@/components/allProductsSearchBar/AllProductsSearchBar";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import LoadMoreButton from "./LoadMoreButton";

const AllProducts = async () => {
  let allProductsPageAllCarouselImgs = [];
  let allProductsData = [];

  // getAllHeroCarouselImgs Fun is start from here
  const getAllHeroCarouselImgs = async () => {
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.getAllHeroCarouselImgs}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "default",
        },
      );

      const result = await res.json();
      if (result?.status >= 200 && result?.status < 400) {
        return result?.data;
      }
      if (result?.status >= 400 && result?.status <= 550) {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  allProductsPageAllCarouselImgs = await getAllHeroCarouselImgs();
  // getAllHeroCarouselImgs Fun is end here

  // getAllProductsFun is start from here
  const getAllProductsFun = async () => {
    try {
      // setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.getAllProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "default",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        return result?.data;
        // console.log("request succes", heroSectionAllProducts);
      }

      if (result?.status >= 400 && result?.status <= 550) {
        return [];
      }
    } catch (error) {
      // console.log(error?.message);
      return [];
    }
  };
  allProductsData = await getAllProductsFun();
  // console.log("allProductsData", allProductsData);
  // getAllProductsFun is end here

  return (
    <div className="max-w-[1400px] m-auto ">
      <AllProductsCrousel
        allProductsPageAllCarouselImgs={allProductsPageAllCarouselImgs}
      />
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between px-[20px] border border-lightGreen ">
        <AllProductsFilter />
        <AllProductsSearchBar />
      </div>
      <div className="mt-[100px]">
        <div className="">
          {/* all products section is start from here */}
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
            <AllProductsCardImg allProductsData={allProductsData} />
            {/* Load More Button  */}
          </div>
          {/* all products section is end from here */}
        </div>
        <LoadMoreButton />
      </div>
    </div>
  );
};

export default AllProducts;
