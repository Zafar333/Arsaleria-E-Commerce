"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";

const ProductDetailSizeMenu = ({ singleProductDetailData }) => {
  const [sizes, setSizes] = useState(["Select Size"]);
  const [dairyWeightOptions, setDairyWeightOptions] = useState([]);
  // selected size fun is sstart from here
  const selectedSizeFun = (size) => {
    setSizes([size]);
  };
  // selected size fun is end here
  useEffect(() => {
    if (
      singleProductDetailData?.length > 0 &&
      singleProductDetailData[0]?.product_variants?.length > 0
    ) {
      return makeSizesFun();
    } else {
      return;
    }
  }, [singleProductDetailData]);

  const makeSizesFun = () => {
    setDairyWeightOptions(
      singleProductDetailData[0]?.product_variants?.map((data) => ({
        label: data?.size,
        value: data?.size,
      })),
    );
  };

  return (
    <div className="flex gap-[20px] items-center">
      <p className="text-darkGreen font-Poppins text-[18px] md:text-[20px]">
        Size:
      </p>
      <Select
        onChange={(value) => selectedSizeFun(value)}
        placeholder={
          <span className="text-[9px] md:text-[14px]">{sizes[0]}</span>
        }
        options={dairyWeightOptions}
      />
    </div>
  );
};

export default ProductDetailSizeMenu;
