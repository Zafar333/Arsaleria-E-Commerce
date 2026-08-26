"use client";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Carousel } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./homeCrousel.css";

const HomeCarousel = ({ heroCarouselAllImgs }) => {
  const [pageLoading, setPageLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  useEffect(() => {
    stopLoadingBar();
  }, []);

  return (
    <Carousel
      arrows
      autoplay
      className="[&_.slick-prev]:text-black! [&_.slick-next]:text-black!"
    >
      {heroCarouselAllImgs?.length > 0
        ? heroCarouselAllImgs.map((media, ind) => (
            <div className="bg-gray-200">
              <Image
                preload
                alt="image"
                width={"200"}
                height={"400"}
                src={media?.secure_url}
                key={ind}
                className="w-full homeCrousel object-contain"
              />
            </div>
          ))
        : "jh"}
      {/* 
      <div>
        <img className="w-full homeCrousel " src="./cover4.webp" alt="" />
      </div>
      <div>
        <img className="w-full homeCrousel  " src="./cover5.webp" alt="" />
      </div>
      <div>
        <img className="w-full homeCrousel " src="./cover6.webp" alt="" />
      </div> */}
    </Carousel>
  );
};

export default HomeCarousel;
