"use client";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { useEffect, useState } from "react";

const ProductDetailPageImgAndImgSlider = () => {
  const [signleProductImgs, setSingleProductImgs] = useState([
    "/homepageImgs/2.webp",
    "/homepageImgs/3.webp",
    "/homepageImgs/4.webp",
    "/homepageImgs/5.webp",
    "/homepageImgs/6.webp",
    "/homepageImgs/7.webp",
    "/homepageImgs/8.webp",
    "/homepageImgs/2.webp",
    "/homepageImgs/3.webp",
    "/homepageImgs/4.webp",
    "/homepageImgs/5.webp",
  ]);
  const [selectedImgIndx, setSelectedImgIndx] = useState(0);

  useEffect(() => {
    stopLoadingBar();
  }, []);

  const ImgIndxFun = (i) => {
    setSelectedImgIndx(i);
  };

  // Arrow handleNext fun is start from here
  const handleNext = () => {
    let increment = selectedImgIndx + 1;
    if (signleProductImgs?.length - 1 != selectedImgIndx) {
      setSelectedImgIndx(increment);
    }
  };
  // Arrow handleNext fun is end here

  // Arrow handlePrev fun is start from here
  const handlePrev = () => {
    let decrement = selectedImgIndx - 1;
    if (selectedImgIndx != 0) {
      setSelectedImgIndx(decrement);
    }
  };
  // Arrow handlePrev fun is end here
  return (
    <div>
      <div className="flex flex-col bg-whiteGray rounded-sm border border-green-500 ">
        {/* next and previous button control section is start from here */}
        <div className="flex justify-between relative top-[205px] ">
          <Button
            onClick={handlePrev}
            className="z-10"
            shape="circle"
            icon={<LeftOutlined className="text-black " />}
          />
          <Button
            className="z-10"
            onClick={handleNext}
            shape="circle"
            icon={<RightOutlined className="text-black " />}
          />
        </div>
        {/* next and previous button control section is start from here */}

        <Image.PreviewGroup items={signleProductImgs}>
          <Image
            className="max-h-[410px] object-contain"
            src={signleProductImgs[selectedImgIndx]}
          />
        </Image.PreviewGroup>
      </div>

      <div className="h-[130px]  flex gap-[20px] items-center px-[5px]  overflow-auto border border-red-400">
        {signleProductImgs.map((img, ind) => (
          <img
            key={ind}
            onClick={() => ImgIndxFun(ind)}
            className={`${selectedImgIndx == ind ? "border border-darkGreen" : ""} bg-whiteGray  rounded-md cursor-pointer max-h-[80px]`}
            src={img}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPageImgAndImgSlider;
