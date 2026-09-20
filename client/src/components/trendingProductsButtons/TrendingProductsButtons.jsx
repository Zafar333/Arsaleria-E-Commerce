"use client";
import {
  setAllProductsBtnStateDispatch,
  setFilterBtnStateDispatch,
} from "@/store/allproductsFilterSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../allProductsFilter/FilterModal";

const TrendingProductsButtons = ({ allCategoriesData, queryParams }) => {
  const checkFilterBtnState = useSelector(
    (state) => state?.allProductsFilterSlice,
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [openFilterModal, setOpenFilterModal] = useState(false);

  useEffect(() => {
    stopLoadingBar();
  }, []);

  // gotAllProductsFun is start from here
  const gotAllProductsFun = () => {
    const query = new URLSearchParams(window.location.search);

    startLoadingBar();
    dispatch(setAllProductsBtnStateDispatch(true));
    dispatch(setFilterBtnStateDispatch(false));

    router.replace("?limit=1&cursor=null");
  };
  // gotAllProductsFun is end here

  // openFilterModalFun is start from here
  const openFilterModalFun = () => {
    dispatch(setAllProductsBtnStateDispatch(false));
    dispatch(setFilterBtnStateDispatch(true));
    setOpenFilterModal(true);
  };
  // openFilterModalFun is end here

  return (
    <div className="flex justify-center mt-[50px] bg-lightGreen rounded-md  mx-0 sm:mx-[100px] xl:mx-[300px]">
      <div className="py-[10px] md:py-3 flex gap-[40px] md:gap-[80px] overflow-x-auto">
        <label
          className={`${checkFilterBtnState?.allProductsBtnState == true ? "border-b-2 border-darkGreen text-darkGreen" : "text-textLightGray"} text-nowrap max-w-fit text-[18px] md:text-[22px] font-Poppins text-textLightGray cursor-pointer`}
          onClick={() => gotAllProductsFun()}
        >
          All Products
        </label>
        <label
          className={`${checkFilterBtnState?.filterBtnState == true ? "border-b-2 border-darkGreen text-darkGreen" : "text-textLightGray"} max-w-fit text-[18px] md:text-[22px] font-Poppins text-textLightGray cursor-pointer`}
          onClick={() => openFilterModalFun()}
        >
          Filters
        </label>
      </div>
      <FilterModal
        queryParams={queryParams}
        allCategoriesData={allCategoriesData}
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
      />
    </div>
  );
};

export default TrendingProductsButtons;
