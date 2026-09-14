"use client";
import {
  setAddProductsDispatch,
  setAllProductsDispatch,
  setInfiniteScrollingCursorDataDispatch,
} from "@/store/allProductsPageSlice";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SeeProductDetail from "./SeeProductDetail";

const AllProductsCardImgClientComponent = ({
  allProductsData,
  paginationCursorData,
}) => {
  const dispatch = useDispatch();
  const reduxAllProductsData = useSelector((state) => state?.allProductsSlice);
  const reduxCursorData = useSelector(
    (state) => state?.allProductsSlice,
  )?.infiniteScrollingCursorData;
  const router = useRouter();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];

    const query = new URLSearchParams(window.location.search);
    if (navigation?.type === "reload") {
      // dispatch(setAllProductsDispatch([]));

      if (query?.has("cursor") && query?.get("cursor") != "null") {
        query?.delete("cursor");
        router.replace(`?${query?.toString()}&cursor=null`);
        dispatch(setAllProductsDispatch([]));
      }
    }
  }, []);
  // useEffect(() => {
  //   console.log("redux data", reduxAllProductsData);
  // }, [reduxAllProductsData]);
  useEffect(() => {
    console.log("reduxCursorData ", reduxCursorData);
  }, [reduxCursorData]);

  useEffect(() => {
    if (allProductsData?.length > 0) {
      if (reduxAllProductsData?.allProducts?.length == 0) {
        // console.log("data", allProductsData);
        dispatch(setAllProductsDispatch(allProductsData));
        dispatch(setInfiniteScrollingCursorDataDispatch(paginationCursorData));
      }
      if (reduxAllProductsData?.allProducts?.length >= 1)
        dispatch(setAddProductsDispatch(allProductsData));
      dispatch(setInfiniteScrollingCursorDataDispatch(paginationCursorData));
    } else {
      dispatch(setInfiniteScrollingCursorDataDispatch(paginationCursorData));
    }
  }, [allProductsData]);

  useEffect(() => {
    const handleScroll = () => {
      if (reduxCursorData[0]?.hasMore && reduxCursorData[0]?.nextCursor) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        // Call when 300px away from bottom
        if (pageHeight - scrollPosition < 200) {
          const query = new URLSearchParams(window.location.search);
          query?.delete("cursor");
          startLoadingBar();
          router.replace(
            `/allProducts?${query?.toString()}&cursor=${reduxCursorData[0]?.nextCursor}`,
          );
        }
      } else {
        return;
      }

      // }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduxCursorData[0]?.nextCursor]);

  return (
    /* card */
    /* loop is apply this div */
    reduxAllProductsData?.allProducts?.length > 0 ? (
      reduxAllProductsData?.allProducts?.map((prod, ind) => (
        <div className="border border-gray-200 h-fit" key={ind}>
          <div className=" bg-whiteGray h-[240px] sm:h-[300px] flex rounded-sm">
            <Image
              alt="Image"
              width={410}
              height={200}
              src={prod?.secure_url}
              className="w-full h-full object-contain "
            />
          </div>
          {/* card text Content */}
          <div className="mt-[10px]">
            <p className="font-Poppins text-[15px] md:text-[18px] text-center text-darkGray bolder font-bold">
              {prod?.product_name}
            </p>
            <div className="grid grid-cols-3 mt-[5px]">
              <p className="font-Poppins text-[15px] md:text-[18px] text-textLightGray text-end">
                {prod?.sellproduct_price_1kg}
              </p>
              <p className="flex justify-center items-center">|</p>
              <p className="font-Poppins text-[15px] md:text-[18px] text-textLightGray ">
                Rs
              </p>
            </div>
            <SeeProductDetail prod={prod} />
          </div>
        </div>
      ))
    ) : (
      // reduxCursorData?[0].hasMore
      <div className="text-[17px] font-Roboto  text-darkGreen">
        No Product Found
      </div>
    )
    /* card text Content */
    /* loop is apply this div */
    /* {card} */
  );
};

export default AllProductsCardImgClientComponent;
