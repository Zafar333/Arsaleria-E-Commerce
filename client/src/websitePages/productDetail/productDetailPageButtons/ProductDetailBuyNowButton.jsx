"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const ProductDetailBuyNowButton = () => {
  const navigate = useRouter();
  // gotoCartPageFun is startf from here
  const gotoCartPageFun = () => {
    navigate.push(`/checkout/${2}`);
  };
  // gotoCartPageFun is end here
  return (
    <div>
      <Button
        className="w-[250px] xl:min-w-full !bg-darkGreen !text-white  !text-[18px] !sm:text-[20px] !font-Poppins !py-[20px] !px-[20px] sm:!px-[30px]"
        onClick={gotoCartPageFun}
      >
        Buy Now
      </Button>
    </div>
  );
};

export default ProductDetailBuyNowButton;
