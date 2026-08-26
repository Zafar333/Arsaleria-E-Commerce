"use client";
import { Carousel } from "antd";
import Image from "next/image";
import "./allProductsCrousel.css";

const AllProductsCrousel = ({ allProductsPageAllCarouselImgs }) => {
  return (
    <Carousel
      arrows
      autoplay
      className="[&_.slick-prev]:text-black! [&_.slick-next]:text-black!"
    >
      {allProductsPageAllCarouselImgs?.length > 0 ? (
        allProductsPageAllCarouselImgs?.map((media, ind) => (
          <div className="bg-gray-200">
            <Image
              preload
              alt="image"
              width={"400"}
              height={"400"}
              src={media?.secure_url}
              key={ind}
              className="w-full allProductsCrousel object-contain"
            />
          </div>
        ))
      ) : (
        <div className="flex! justify-center! items-center! allProductsCrousel bg-gray-200">
          <label className="text-darkGreen font-Poppins text-[16px] ">
            {" "}
            No media found
          </label>
        </div>
      )}
    </Carousel>
  );
};

export default AllProductsCrousel;
