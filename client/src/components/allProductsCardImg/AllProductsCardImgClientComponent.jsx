"use client";
import {
  setAddProductsDispatch,
  setAllProductsDispatch,
  setInfiniteScrollingCursorDataDispatch,
} from "@/store/allProductsPageSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  const [screenLoader, setScreenLoader] = useState(false);

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

  useEffect(() => {
    setScreenLoader(false);
    stopLoadingBar();

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
          setScreenLoader(true);
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

  // seeProductDetailFun i start from here
  const seeProductDetailFun = (prod) => {
    if (!prod || !prod?.id) {
      return toast.error("invalid request");
    }
    startLoadingBar();
    router.push(`/productDetail/${prod?.id}`);
  };
  // seeProductDetailFun i start from here

  return (
    /* card */
    <div className="">
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
        {reduxAllProductsData?.allProducts?.length > 0 ? (
          reduxAllProductsData?.allProducts?.map((prod, ind) => (
            <div
              className="border border-gray-200 h-fit cursor-pointer "
              key={ind}
              onClick={() => seeProductDetailFun(prod)}
            >
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
                <div className="mt-[15px]">
                  <p
                    onClick={() => seeProductDetailFun(prod)}
                    className="text-center bg-lightGreen text-darkGreen font-Poppins text-[16px] p-1 cursor-pointer"
                  >
                    View Detail
                  </p>
                </div>
              </div>
            </div>
            //  {/* screenLoader == false ? (
            //   <div className="border border-black" key={"hghj54654"}>
            //      loadingg
            //  </div>
            //  ) : null */}
          ))
        ) : (
          <div className="text-[14px] md:text-[17px] font-Roboto  text-darkGreen">
            No Product Found
          </div>
        )}
      </div>
      {reduxCursorData[0]?.hasMore == false ? (
        <div className="mt-[40px] flex justify-center ">
          <p className="text-[15px] text-darkGreen font-Poppins">
            No more products
          </p>
        </div>
      ) : null}

      {screenLoader == true ? (
        <div className="mt-[70px] flex justify-center ">
          <Spin size="large" className="" />
        </div>
      ) : null}
    </div>
    /* card text Content */
    /* loop is apply this div */
    /* {card} */
  );
};

export default AllProductsCardImgClientComponent;
