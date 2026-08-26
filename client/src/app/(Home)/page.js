export const dynamic = "force-dynamic";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import Home from "@/websitePages/Home/Home";

const page = async () => {
  let heroSectionAllProducts = [];
  let heroCarouselAllImgs = [];
  let getAllFeaturedProductsData = [];

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
  heroCarouselAllImgs = await getAllHeroCarouselImgs();
  // getAllHeroCarouselImgs Fun is end here

  // getAllFeaturedProductsFun is start from here
  const getAllFeaturedProductsFun = async () => {
    try {
      const res = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.getAllFeaturedProducts}`,
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
  getAllFeaturedProductsData = await getAllFeaturedProductsFun();
  // getAllFeaturedProductsFun is end here

  // getAllProductsFunApi is start from here

  const getAllProductsFunApi = async () => {
    try {
      // setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.getHeroSectionAllProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
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

      // return (heroSectionAllProducts = []);
    }
  };

  heroSectionAllProducts = await getAllProductsFunApi();
  // getAllProductsFunApi is end here

  return (
    <div className="mx-[10px] sm:mx-[20px]">
      <Home
        heroSectionAllProducts={heroSectionAllProducts}
        heroCarouselAllImgs={heroCarouselAllImgs}
        getAllFeaturedProductsData={getAllFeaturedProductsData}
      />
    </div>
  );
};

export default page;
