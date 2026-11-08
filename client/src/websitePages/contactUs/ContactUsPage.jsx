"use client";
import { setAllProductsDispatch } from "@/store/allProductsPageSlice";
import {
  setAllProductsBtnStateDispatch,
  setFilterBtnStateDispatch,
} from "@/store/allproductsFilterSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./contactUs.css";

const ContactUsPage = () => {
  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false);
  useEffect(() => {
    stopLoadingBar();
    dispatch(setAllProductsDispatch([]));
    dispatch(setAllProductsBtnStateDispatch(true));
    dispatch(setFilterBtnStateDispatch(false));
  }, []);
  const { TextArea } = Input;

  // contactus fun page is start from hrer
  const onFinish = async (values) => {
    toast.success("contact us");
    try {
      setBtnLoader(true);
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints.contactus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cache: "no-store",
          body: JSON.stringify(values),
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        stopLoadingBar();
        setBtnLoader(false);
        return toast.success(result?.message);
        // return toast.success(result?.message);
      }

      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        setBtnLoader(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();
      setBtnLoader(false);
      // console.log(error?.message);
      return toast.error("server error");
    }
  };
  // contactus fun page is end here

  const onFinishFailed = (errorInfo) => {
    toast.error("server error");
  };

  return (
    <div>
      <div className="h-[300px] contantusBgImg">
        <div className="absolute right-[20px] h-[300px] flex items-center text-[35px] font-Poppins text-darkGreen font-bold">
          ContactUs
        </div>
        <img
          src="/contactusPageImgs/contactPhnImg.png"
          alt=""
          className="w-full md:w-[400px] lg:w-[530px] xl:w-[700px] 2xl:w-[800px] h-[300px] relative opacity-35"
        />
        {/* <img src="/contactusPageImgs/imgBgcolor.png" alt="" className='w-full' /> */}
      </div>

      {/* contact us form is start from here */}

      <div className="mt-[60px] sm:mt-[100px] flex flex-col items-center px-[20px] sm:px-0]">
        <div className="mb-4">
          <p className="text-[28px] text-darkGreen font-Poppins">
            Let&quot;s talk with us
          </p>
        </div>
        <Form
          className="py-[20px] px-[20px] bg-gray-100 rounded-sm w-full"
          layout="vertical"
          name="basic"
          labelCol={{
            span: 8,
          }}
          // wrapperCol={{
          //   span: 16,
          // }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter correct email!",
              },
            ]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "write message" }]}
          >
            <TextArea rows={4} placeholder="Your message ..." />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              className="text-white bg-darkGreen text-[16px] font-Poppins"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* contact us form is end here */}
    </div>
  );
};

export default ContactUsPage;
