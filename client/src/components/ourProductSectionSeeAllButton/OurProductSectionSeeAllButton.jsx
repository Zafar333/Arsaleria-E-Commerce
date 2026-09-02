"use client";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Button } from "antd";
import { useRouter } from "next/navigation";
const OurProductSectionSeeAllButton = () => {
  const navigate = useRouter();
  const seeAllFun = () => {
    startLoadingBar();
    navigate.push("/allProducts?limit=1&cursor=null");
  };
  return (
    <div className="flex justify-center mt-[80px]">
      <Button
        className="!py-[24px] !px-[60px] !rounded-sm  bg-lightGreen! text-darkGreen! !text-[22px] !font-Poppins"
        onClick={seeAllFun}
      >
        See All
      </Button>
    </div>
  );
};

export default OurProductSectionSeeAllButton;
