"use client";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { adminLoginEndpoints } from "@/utils/api/admin/adminLogin";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { RiAdminLine, RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "./adminSignup.css";

const AdminSignup = () => {
  const navigate = useRouter();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setpageLoading] = useState(false);

  // goToAdminSignupModal is start from here
  const goToAdminLoginModal = () => {
    startLoadingBar();
    setpageLoading(true);
    navigate.push("/adminLogin");
  };
  // goToAdminSignupModal is end here

  // logiform functions is start from here

  const onFinish = (values) => {
    setLoading(true);
    if (values) {
      // console.log('adminSignup:', values);
      adminSignupFun(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // login fun is start from here
  const adminSignupFun = async (val) => {
    // console.log("signupFun", val);
    try {
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminLoginEndpoints?.signup}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
          cache: "no-store",
        },
      );

      // Handle successful response
      const result = await response.json();
      if (result?.status >= 200 && result?.status <= 300) {
        form.resetFields(null);

        setLoading(false);
        setpageLoading(true);
        toast.success(result?.message);
        navigate.replace(`${frontendDevelopmentBaseUrl}/adminLogin`);
      }
      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        setLoading(false);
        toast?.error(result?.message);
      }
    } catch (error) {
      setLoading(false);
      stopLoadingBar();

      // console.error('Error:', error);
      toast.error("server error");
    }
  };
  // login fun is start end here
  return (
    <div className="bg-lightGreen adminSignupContainer flex justify-center items-center">
      {pageLoading == false ? (
        <div className="mx-[20px] my-[15px] sm:my-0 sm:mx-0 h-[540px] shadow-lg bg-white w-[600px] rounded-md">
          <div className="my-[30px] mx-[25px]">
            <div className="mb-[5px]">
              <RiAdminLine className="text-lightGreen text-[50px] sm:text-[80px] m-auto" />
            </div>
            <p className="mb-[15px] font-Poppins text-[18px] xs:text-[20px] sm:text-[24px] text-darkGreen font-bold text-center">
              Admin Signup
            </p>

            <Form
              form={form}
              className=""
              layout="vertical"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input
                  prefix={<CiUser className="text-[15px] text-gray-400" />}
                  placeholder="Enter your name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "please enter valid email",
                  },
                ]}
              >
                <Input
                  prefix={
                    <AiOutlineMail className="text-[15px] text-gray-400" />
                  }
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <RiLockPasswordLine className="text-[15px] text-gray-400" />
                  }
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="flex flex-col gap-3">
                {loading == false ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bgClr bg-darkGreen! text-white! text-[16px]! md:text-[18px]! py-[16px]! md:py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
                  >
                    SignUp
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className="w-full bg-darkGreen! text-white! py-[16px]! md:py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
                  >
                    <LoadingOutlined
                      className="text-lightGreen text-[24px]"
                      spin
                    />
                  </Button>
                )}
              </div>

              <div className="text-center mt-4">
                <label
                  className="text-darkGreen cursor-pointer font-Poppins"
                  onClick={goToAdminLoginModal}
                >
                  if you have already Account? Login
                </label>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AdminSignup;
