"use client";
import { startLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoadMoreButton = ({ allProductsData }) => {
  const router = useRouter();
  useEffect(() => {
    // const handleScroll = () => {
    //   console.log("Scrolling...", window.scrollY);
    //   console.log("innerHeight...", window.innerHeight);
    // };
    const handleScroll = () => {
      if (allProductsData?.length > 0) {
        let data = allProductsData?.length - 1;
        let cursor = allProductsData[data]?.id;
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        // Call when 300px away from bottom
        if (pageHeight - scrollPosition < 200) {
          startLoadingBar();
          router.push(`/allProducts?limit=10&cursor=${cursor}`);
          // console.log("Scrolling...", window.scrollY);
          // console.log("pageHeight...", pageHeight);

          // getMoreProducts();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="text-center mt-[40px]">
      <Button className="bg-darkGreen! text-white! text-[20px]! sm:text-[22px]! py-[25px]!">
        Load More Products
      </Button>
    </div>
  );
};

export default LoadMoreButton;
