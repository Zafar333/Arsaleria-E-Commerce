"use client";
import { stopLoadingBar } from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { useEffect, useState } from "react";

const ProductDetailPageImgAndImgSlider = ({ singleProductDetailData }) => {
  const [signleProductImgs, setSingleProductImgs] = useState([]);
  const [selectedImgIndx, setSelectedImgIndx] = useState(0);

  useEffect(() => {
    stopLoadingBar();
  }, []);
  useEffect(() => {
    if (singleProductDetailData?.length > 0) {
      setSingleProductImgs(singleProductDetailData[0]?.media);
    } else {
      return;
    }
  }, [singleProductDetailData]);

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
  useEffect(() => {
    console.log("signleProductImgs", signleProductImgs);
  }, [signleProductImgs]);
  // Arrow handlePrev fun is end here
  return (
    <div className="h-fit">
      <div className="flex flex-col bg-whiteGray rounded-sm border border-green-500 min-h-[410px] max-w-[700px]">
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
            className="max-h-[410px] w-full md:min-w-[700px] object-contain"
            src={signleProductImgs[selectedImgIndx]?.secure_url}
          />
        </Image.PreviewGroup>
      </div>

      <div className="h-[140px]  flex gap-[20px] items-center px-[5px]  overflow-auto border border-red-400">
        {signleProductImgs.map((img, ind) => (
          <img
            key={ind}
            onClick={() => ImgIndxFun(ind)}
            className={`${selectedImgIndx == ind ? "border border-darkGreen" : ""} bg-amber-500  rounded-md cursor-pointer max-h-[80px]! w-[130px] `}
            src={img?.secure_url}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPageImgAndImgSlider;
