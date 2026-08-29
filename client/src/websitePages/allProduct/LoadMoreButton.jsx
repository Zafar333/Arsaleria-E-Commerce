"use client";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoadMoreButton = ({ allProductsData, paginationCursorData }) => {
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      // if (allProductsData?.length > 0) {
      if (
        paginationCursorData[0]?.hasMore &&
        paginationCursorData[0]?.nextCursor
      ) {
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        // Call when 300px away from bottom
        if (pageHeight - scrollPosition < 200) {
          startLoadingBar();
          console.log("set route");
          router.replace(
            `/allProducts?limit=1&cursor=${paginationCursorData[0]?.nextCursor}`,
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
  }, [paginationCursorData[0]?.nextCursor]);
  return (
    <div className="text-center mt-[40px] flex flex-col">
      {paginationCursorData[0]?.hasMore == false ? (
        <label className="text-darkGreen text-[14px] font-Poppins">
          No more products
        </label>
      ) : null}
      <label className="bg-white! text-white! text-[20px]! sm:text-[22px]! py-[25px]!">
        Load More Products
      </label>
    </div>
  );
};

export default LoadMoreButton;
