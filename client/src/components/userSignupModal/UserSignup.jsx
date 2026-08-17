"use client";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const UserSignup = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setIsSignUpModalOpen,
  isSignUpModalOpen,
}) => {
  const [form] = Form.useForm();
  const [signupData, setSignupData] = useState();
  const [signupLoader, setSignupLoader] = useState(false);

  // logiform functions is start from here
  const onFinish = (values) => {
    setSignupLoader(true);
    setSignupData(values);
    if (values) {
      signUpFun(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // modal function is start from here
  const handleOk = () => {
    setIsSignUpModalOpen(false);
  };
  const handleCancel = () => {
    setIsSignUpModalOpen(false);
  };
  // modal function is start end here

  // openSignupModal is start from here
  const openLoginModal = () => {
    startLoadingBar();
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  // openSignupModal is end here

  // login fun is start from here
  const signUpFun = async (val) => {
    // console.log("signupdatag",val)
    try {
      startLoadingBar();

      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.registration}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
          cache: "no-store",
        },
      );
      // if (!response.ok) throw new Error('Submission failed');
      // Handle successful response
      const result = await response.json();
      // console.log("result",result)
      if (result?.status >= 200 && result?.status <= 300) {
        stopLoadingBar();
        form.resetFields(null);
        setSignupLoader(false);
        toast.success(result?.message);
        setIsSignUpModalOpen(false);
      }
      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();

        setSignupLoader(false);

        toast.error(result?.message);
      }
    } catch (error) {
      setSignupLoader(false);
      stopLoadingBar();

      toast.error("server error");
      setIsSignUpModalOpen(true);
    }
  };
  // login fun is start end here
  return (
    <Modal
      className="h-[500px]"
      open={isSignUpModalOpen}
      onOk={handleOk}
      footer={false}
      onCancel={handleCancel}
    >
      <div className="my-[25px]">
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
              prefix={<AiOutlineMail className="text-[15px] text-gray-400" />}
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
                <RiLockPasswordLine className="text-gray-400 text-[15px]" />
              }
              placeholder="Enter your password"
            />
          </Form.Item>

          <div>
            {signupLoader == false ? (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full  bg-darkGreen! text-white! text-[16px]! py-[16px]! font-Poppins!"
              >
                Signup
              </Button>
            ) : (
              <Button
                type="primary"
                className="w-full  bg-darkGreen! py-[16px]! font-Poppins!"
              >
                <LoadingOutlined
                  className="text-lightGreen! text-[24px]!"
                  spin
                />
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <label
              className="text-darkGreen cursor-pointer font-Poppins text-[14px] "
              onClick={openLoginModal}
            >
              if you have already Account? Login
            </label>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UserSignup;
