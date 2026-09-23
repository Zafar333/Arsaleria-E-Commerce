"use client";
import { Button } from "antd";
import { FaWhatsapp } from "react-icons/fa";

const ProductDetailChatWhatsappButton = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = "Hello, I want to know more about your products.";
  // gotoWhatsAppFun is start from here
  const gotoWhatsAppFun = () => {
    window.open(
      `https://wa.me/${whatsappNumber}??text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };
  // gotoWhatsAppFun is end here
  return (
    <div>
      <Button
        icon={<FaWhatsapp className="text-white!" />}
        onClick={gotoWhatsAppFun}
        className="bg-[#25D366]! text-white! !text-[17px] sm:!text-[20px] !py-[20px] !px-[20px] font-Poppins! w-[250px]! xl:w-full!"
      >
        {" "}
        Chat Whatsapp
      </Button>
    </div>
  );
};

export default ProductDetailChatWhatsappButton;
