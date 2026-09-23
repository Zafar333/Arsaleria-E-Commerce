"use client";
import { useSelector } from "react-redux";

const ProductDetailStockStatus = () => {
  const trackQuantityStatus = useSelector((state) => state?.productDetailSlice);

  return (
    <div className="flex items-center gap-2 ">
      <p className="text-darkGreen text-[18px] sm:text-[20px] md:text-[24px] font-Poppins">
        Status :
      </p>
      {Object.keys(trackQuantityStatus?.selectedSizeProductQunatity)?.length >
        0 &&
        (trackQuantityStatus?.selectedSizeProductQunatity?.quantity > 0 ? (
          <p className="text-lightGreen text-[18px] sm:text-[20px]  md:text-[22px] font-Poppins">
            In Stock
          </p>
        ) : (
          <p className="text-lightGreen text-[18px] sm:text-[20px] md:text-[22px] font-Poppins">
            Not Avalable
          </p>
        ))}
    </div>
  );
};

export default ProductDetailStockStatus;
