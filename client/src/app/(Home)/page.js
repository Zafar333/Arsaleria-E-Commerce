export const dynamic = "force-dynamic";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import Home from "@/websitePages/Home/Home";

const page = async () => {
  let heroSectionAllProducts = [];

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
    <div className="mx-[10px] sm:mx-[20px] ">
      <Home heroSectionAllProducts={heroSectionAllProducts} />
    </div>
  );
};

export default page;
