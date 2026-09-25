"use client";
import { setSelectedSizeProductDetailSliceDispatch } from "@/store/productDetailSlice";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetailSizeMenu = ({ singleProductDetailData }) => {
  const dispatch = useDispatch();
  const [sizes, setSizes] = useState([]);
  const [dairyWeightOptions, setDairyWeightOptions] = useState([]);
  // selected size fun is sstart from here
  const selectedSizeFun = (value, obj) => {
    setSizes([value]);
    dispatch(
      setSelectedSizeProductDetailSliceDispatch([
        {
          productId: singleProductDetailData[0]?.id,
          product_name: singleProductDetailData[0]?.product_name,
          buyQuantity: 1,
          productVariantId: obj?.id,
          size: obj?.value,
          stock_quantity: obj?.quantity,
          price: obj?.price,
          unit: obj?.unit,
          stock_status: obj?.stock_status,
        },
      ]),
    );
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
        id: data?.id,
        quantity: data?.quantity,
        label: data?.size,
        value: data?.size,
        price: data?.price,
        unit: data?.unit,
        stock_status: data?.stock_status,
      })),
    );
  };
  useEffect(() => {
    if (dairyWeightOptions?.length > 0) {
      console.log("dairyWeightOptions", dairyWeightOptions);
      setSizes([dairyWeightOptions[0]?.value]);
      dispatch(
        setSelectedSizeProductDetailSliceDispatch([
          {
            productId: singleProductDetailData[0]?.id,
            product_name: singleProductDetailData[0]?.product_name,
            buyQuantity: 1,
            productVariantId: dairyWeightOptions[0]?.id,
            size: dairyWeightOptions[0]?.value,
            stock_quantity: dairyWeightOptions[0]?.quantity,
            price: dairyWeightOptions[0]?.price,
            unit: dairyWeightOptions[0]?.unit,
            stock_status: dairyWeightOptions[0]?.stock_status,
          },
        ]),
      );
    } else {
      return;
    }
  }, [dairyWeightOptions]);

  return (
    <div className="flex gap-[20px] items-center">
      <p className="text-darkGreen font-Poppins text-[18px] md:text-[20px]">
        Size:
      </p>
      <Select
        onChange={(value, obj) => selectedSizeFun(value, obj)}
        placeholder={
          <span className="text-[9px] md:text-[14px]">{sizes[0]}</span>
        }
        options={dairyWeightOptions}
      />
    </div>
  );
};

export default ProductDetailSizeMenu;
