import { AiOutlineMail } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLocationDot, FaSquareFacebook } from "react-icons/fa6";

const Fotter = () => {
  return (
    <div className="border border-black mt-[100px] bg-darkGreen py-[40px] ">
      <div className="flex flex-wrap gap-[30px] items-start px-[10px] sm:flex-row sm:justify-around border border-white">
        {/* ContactUs  */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[16px] sm:text-[18px] md:text-[22px] text-white font-Roboto">
            Contact Us
          </label>
          <div className="flex gap-[20px] px-[12px] ">
            <AiOutlineMail className="text-[25px] text-lightGreen" />
            <div className="">
              <p className="font-Poppins text-[14px] sm:text-[16px] text-lightGreen">
                Email
              </p>
              <p className="font-Poppins text-[12px] sm:text-[14px] text-lightGreen">
                whitegolddairy@gmail.com
              </p>
            </div>
          </div>
          <div className="flex gap-[20px] px-[12px]">
            <FaLocationDot className="text-[25px] text-lightGreen" />
            <div className="">
              <p className="font-Poppins text-[14px] sm:text-[16px] text-lightGreen">
                Address
              </p>
              <p className="font-Poppins text-[12px] sm:text-[13px] text-lightGreen">
                WahCantt Pakistan
              </p>
            </div>
          </div>
        </div>
        {/* ContactUs  */}
        {/* company info */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[16px] sm:text-[18px] md:text-[22px] text-white font-Roboto">
            Company
          </p>
          <div className="px-[12px]">
            <p className="text-[12px] sm:text-[14px] font-Poppins text-lightGreen cursor-pointer">
              About US
            </p>
            <p className="text-[12px] sm:text-[14px] font-Poppins text-lightGreen cursor-pointer">
              Privacy Policy
            </p>
          </div>
        </div>
        {/* company info */}
        <div className="flex flex-col gap-[10px]">
          {/* <p className='text-white font-Elephant text-[16px] sm:text-[22px]'>Fashion Fusion</p> */}
          {/* social Media */}
          <div className="flex flex-col gap-2">
            <p className="text-[16px] sm:text-[18px] md:text-[22px] text-white font-Roboto">
              Social Media
            </p>
            <div className="flex gap-[10px] sm:gap-[30px] px-[12px]">
              <a
                className="cursor-pointer "
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61561000816583"
              >
                <FaSquareFacebook className="text-[25px] sm:text-[30px] text-lightGreen" />
              </a>
              <a
                className="cursor-pointer"
                target="_blank"
                href="https://www.instagram.com/arslanzafar11/?hl=en"
              >
                <FaInstagramSquare className="text-[25px] sm:text-[30px] text-lightGreen" />
              </a>
            </div>
          </div>
          {/* social Media */}
        </div>
      </div>
    </div>
  );
};

export default Fotter;
