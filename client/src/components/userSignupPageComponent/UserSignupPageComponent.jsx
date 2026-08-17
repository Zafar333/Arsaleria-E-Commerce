"use client";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UserSignupPageComponent = () => {
  const [form] = Form.useForm();

  const router = useRouter();
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    stopLoadingBar();
  }, []);

  // logiform functions is start from here
  const onFinish = async (values) => {
    try {
      // console.log('Success:', values);
      setLoginData(values);

      if (values) {
        // console.log('login ha g:', values);
        await signupFun(values);
      }
    } catch (error) {
      toast.error("server error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // login fun is start from here
  const signupFun = async (val) => {
    // console.log("loginFun",val)
    setLoading(true);
    try {
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.registration}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(val),
          cache: "no-store",
        },
      );

      // if (!response.ok) throw new Error('Submission failed');

      // Handle successful response
      const result = await response.json();
      if (result?.status == 200) {
        setLoading(false);
        form.resetFields();

        router.replace(`${frontendDevelopmentBaseUrl}/userLogin`);

        return toast.success(result?.message);
      }
      if (result?.status == 400) {
        setLoading(false);
        stopLoadingBar();

        return toast?.error(result?.message);
      }
    } catch (error) {
      setLoading(false);
      stopLoadingBar();

      // console.error('Error:', error);
      return toast.error("server error");
    }
  };
  // login fun is start end here

  // openSignupModal is start from here
  const gotoLoginPage = () => {
    startLoadingBar();
    router.replace(`${frontendDevelopmentBaseUrl}/userLogin`);
    // setIsSignUpModalOpen(true)
  };

  // openSignupModal is end here

  return (
    <div className="w-full h-screen px-2 xs:px-5 sm:px-10 md:px-20 xl:px-40 2xl:px-60 py-5 [@media(min-height:600px)]:py-10 [@media(min-height:700px)]:py-14 [@media(min-height:750px)]:py-24 grid grid-cols-[1fr_3fr]">
      {/* comany logo section is start from here */}
      {/* <div></div> */}
      <div className="shadow-md bg-lightGreen rounded-tl-lg rounded-bl-lg flex items-center justify-center relative">
        <Image
          className="max-w-[60px] xs:max-w-[90px] sm:max-w-[120px] lg:max-w-[200px] object-contain"
          src="/companyLogo/companylogo.png"
          alt="image"
          width={200}
          height={200}
        />
      </div>
      {/* comany logo section is end from here */}

      {/* login form section is start from here */}

      <div className="px-2 sm:px-5 md:px-10 lg:px-20 py-14 [@media(min-height:700px)]:py-24 bg-gray-50 shadow-md">
        <div className="text-center mt-2 mb-8">
          <p className="text-[25px] sm:text-[30px] md:text-[40px] font-Poppins text-darkGreen ">
            SIGNUP
          </p>
        </div>
        <Form
          form={form}
          className=""
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          //   initialValues={{
          //     remember: true,
          //   }}
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
              placeholder="Enter Your Name"
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
              placeholder="Enter Your email"
              prefix={<AiOutlineMail className="text-[15px] text-gray-400" />}
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
              placeholder="Enter your password"
              prefix={
                <RiLockPasswordLine className="text-gray-400 text-[15px]" />
              }
            />
          </Form.Item>

          <div className="mt-4 flex flex-col gap-4 ">
            {loading == false ? (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bgClr bg-darkGreen! text-white! text-[16px]! sm:text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
              >
                SIGNUP
              </Button>
            ) : (
              <Button
                type="primary"
                className="w-full bgClr bg-darkGreen! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
              >
                <LoadingOutlined
                  className="text-lightGreen! text-[24px]!"
                  spin
                />
              </Button>
            )}
          </div>
          <p className="mt-[8px] text-center font-Poppins text-[16px] md:text-[25px] text-darkGreen">
            or
          </p>

          <div className="text-center mt-3">
            <p
              className="text-darkGreen cursor-pointer font-Poppins text-[12px] md:text-[14px] "
              onClick={gotoLoginPage}
            >
              if you have account? login here
            </p>
          </div>
        </Form>
      </div>
      {/* login form section is end here */}
    </div>
  );
};

export default UserSignupPageComponent;
