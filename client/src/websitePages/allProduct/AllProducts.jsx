export const dynamic = "force-dynamic";

import AllProductsCardImgClientComponent from "@/components/allProductsCardImg/AllProductsCardImgClientComponent";
import AllProductsCrousel from "@/components/allProductsCrousel/AllProductsCrousel";
import AllProductsSearchBar from "@/components/allProductsSearchBar/AllProductsSearchBar";
import TrendingProductsButtons from "@/components/trendingProductsButtons/TrendingProductsButtons";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";

// await getAllProductsFun();

const AllProducts = async ({ queryParams }) => {
  let allProductsPageAllCarouselImgs = [];
  let allProductsData = [];
  let allProductsInfiniteScrollingClientComponentData = [];
  let allSelectedFiltersProductsData = [];
  let managedata = {};
  let paginationCursorData = [];
  let allCategoriesData = [];
  const keys = Object.keys(queryParams);

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

  // getAllProductsFun  get only first 10 or 20 product for server productsCardimgs component is start from here
  const getAllProductsFun = async () => {
    try {
      // setPageLoading(true);
      const query = new URLSearchParams(queryParams);
      if (
        Object.keys(queryParams)?.length > 0 &&
        // keys.length == 2 &&
        keys.length > 0 &&
        keys.includes("limit") &&
        keys.includes("cursor") &&
        queryParams?.limit == "1"
      ) {
        // console.log("getAllProductsFun request is going");

        const response = await fetch(
          `${DevelopmentBaseUrl}${userEndPoints?.getAllProducts}?${query.toString()}`,
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
          return result;
          // console.log("request succes", heroSectionAllProducts);
        }

        if (result?.status >= 400 && result?.status <= 550) {
          return [];
        }
      } else {
        // console.log("getAllProductsFun request is not going");
      }
    } catch (error) {
      // console.log(error?.message);
      return [];
    }
  };

  // allProductsData = await getAllProductsFun();
  managedata = await getAllProductsFun();
  allProductsData = managedata?.data;
  // console.log("allProductsDatag", managedata);
  paginationCursorData = [
    {
      nextCursor: managedata?.nextCursor,
      hasMore: managedata?.hasMore,
    },
  ];

  // getAllHeroCarouselImgs Fun is start from here
  const getAllCategoriesFun = async () => {
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.getAllCategories}`,
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

  allCategoriesData = await getAllCategoriesFun();
  // getAllHeroCarouselImgs Fun is end here

  return (
    <div className="max-w-[1400px] m-auto ">
      <AllProductsCrousel
        allProductsPageAllCarouselImgs={allProductsPageAllCarouselImgs}
      />
      <div className="flex justify-end px-[20px] border border-lightGreen ">
        <AllProductsSearchBar />
      </div>
      {/* in TrendingProductsButtons we have filters button features button is start from here */}
      <TrendingProductsButtons
        allCategoriesData={allCategoriesData}
        queryParams={queryParams}
      />
      {/* in TrendingProductsButtons we have filters button features button is end here */}

      <div className="mt-[100px]">
        <div className="">
          {/* all products section is start from here */}
          {/* this is AllProductsCardImgClientComponent for get next remaining products get from server side fetch and load in clien componnet through cursor paginantion  */}
          <AllProductsCardImgClientComponent
            allProductsData={allProductsData}
            paginationCursorData={paginationCursorData}
            allSelectedFiltersProductsData={allSelectedFiltersProductsData}
          />
          {/* this is AllProductsCardImgClientComponent for get next remaining products get from server side fetch and load in clien componnet through cursor paginantion  */}

          {/* all products section is end from here */}
        </div>
        {/* <LoadMoreButton
          allProductsData={allProductsData}
          paginationCursorData={paginationCursorData}
        /> */}
      </div>
    </div>
  );
};

export default AllProducts;
