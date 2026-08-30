"use client";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Button } from "antd";
import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";

const AllProductsApllyFilterBtn = ({ allCategoriesData }) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);

  useEffect(() => {
    stopLoadingBar();
  }, []);

  const openFilterModalFun = () => {
    setOpenFilterModal(true);
  };

  return (
    <div>
      <FilterModal
        allCategoriesData={allCategoriesData}
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
      />
      <Button
        className="bg-lightGreen! text-darkGreen! text-[16px]! font-Poppins"
        onClick={openFilterModalFun}
      >
        Apply Filter
      </Button>
    </div>
  );
};

export default AllProductsApllyFilterBtn;
