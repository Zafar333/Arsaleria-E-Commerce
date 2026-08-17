"use client";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { Carousel } from "antd";
import { useEffect } from "react";
import "./homeCrousel.css";

const HomeCarousel = () => {
  useEffect(() => {
    stopLoadingBar();
  }, []);

  return (
    <Carousel arrows autoplay className="">
      <div>
        <img className="w-full homeCrousel " src="./cover4.webp" alt="" />
      </div>
      <div>
        <img className="w-full homeCrousel  " src="./cover5.webp" alt="" />
      </div>
      <div>
        <img className="w-full homeCrousel " src="./cover6.webp" alt="" />
      </div>
      {/* <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div> */}
    </Carousel>
  );
};

export default HomeCarousel;
