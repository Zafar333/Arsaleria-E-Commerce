"use client";
import { setUserLoginProductDetailPagePathSliceDispatch } from "@/store/productDetailSlice";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetailBuyNowButton = ({ id, singleProductDetailData }) => {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [btnLoader, setBtnLoader] = useState(false);
  // gotoCartPageFun is startf from here
  const gotoCartPageFun = () => {
    setBtnLoader(true);
    dispatch(
      setUserLoginProductDetailPagePathSliceDispatch({
        productDetailPath: `/productDetail/${id}`,
      }),
    );
    startLoadingBar();
    navigate.push(`/buyNowSingleProduct`);
  };
  // gotoCartPageFun is end here
  return (
    <div>
      {btnLoader == false ? (
        <Button
          className=" w-[250px]! xl:w-full! !bg-darkGreen !text-white  !text-[17px] !sm:text-[20px] !font-Poppins !py-[20px] !px-[20px] sm:!px-[30px]"
          onClick={gotoCartPageFun}
        >
          Buy Now
        </Button>
      ) : (
        <Button
          loading
          className=" w-[250px]! xl:w-full! !bg-darkGreen !text-white  !text-[17px] !sm:text-[20px] !font-Poppins !py-[20px] !px-[20px] sm:!px-[30px]"
        ></Button>
      )}
    </div>
  );
};

export default ProductDetailBuyNowButton;
