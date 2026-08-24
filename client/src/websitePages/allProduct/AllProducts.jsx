import AllProductsCardImg from "@/components/allProductsCardImg/AllProductsCardImg";
import AllProductsCrousel from "@/components/allProductsCrousel/AllProductsCrousel";
import AllProductsFilter from "@/components/allProductsFilter/AllProductsFilter";
import AllProductsSearchBar from "@/components/allProductsSearchBar/AllProductsSearchBar";
import LoadMoreButton from "./LoadMoreButton";

const AllProducts = () => {
  return (
    <div className="max-w-[1400px] m-auto ">
      <AllProductsCrousel />
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between px-[20px] border border-lightGreen ">
        <AllProductsFilter />
        <AllProductsSearchBar />
      </div>
      <div className="mt-[100px]">
        <div className="flex gap-[20px] ">
          <div className="hidden md:block min-w-[100px] h-[650px] border border-red-500">
            Google Ads
          </div>
          {/* all products section is start from here */}
          <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
            <AllProductsCardImg />
            {/* Load More Button  */}

            {/* Load More Button  */}
          </div>
          {/* all products section is end from here */}

          <div className="hidden md:block min-w-[100px] h-[650px] border border-red-500">
            Google Ads
          </div>
        </div>
        <LoadMoreButton />
      </div>
    </div>
  );
};

export default AllProducts;
