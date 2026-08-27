"use client";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { useRouter } from "next/navigation";

const SeeProductDetail = ({ prod }) => {
  const router = useRouter();
  //   console.log("prod", prod);
  const seeProductDetailFun = () => {
    startLoadingBar();
    router.replace(`/productDetail/${prod?.id}`);
  };
  return (
    <div className="mt-[15px]">
      <p
        onClick={seeProductDetailFun}
        className="text-center bg-lightGreen text-darkGreen font-Poppins text-[16px] p-1 cursor-pointer"
      >
        View Detail
      </p>
    </div>
  );
};

export default SeeProductDetail;
