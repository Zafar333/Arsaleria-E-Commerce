"use client";
import { setUserLoginDetailDispatch } from "@/store/userLoginDetailSlice";
import {
  startLoadingBar,
  stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./userLogin.css";

const UserLogin = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
  setIsSignUpModalOpen,
  isSignUpModalOpen,
}) => {
  const session = useSession();
  // console.log("Hello session", session);
  const [form] = Form.useForm();
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signGoogleBtnLoader, setSignGoogleBtnLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoginModalOpen == true) {
      stopLoadingBar();
    }
  }, [isLoginModalOpen]);

  // logiform functions is start from here
  const onFinish = (values) => {
    // console.log('Success:', values);
    setLoginData(values);

    if (values) {
      // console.log('login ha g:', values);
      loginFun(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // modal function is start from here
  const handleOk = () => {
    setIsLoginModalOpen(false);
  };
  const handleCancel = () => {
    setIsLoginModalOpen(false);
  };
  // modal function is end here

  // openSignupModal is start from here
  const openSignupModal = () => {
    startLoadingBar();
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  // openSignupModal is end here

  // login fun is start from here
  const loginFun = async (val) => {
    // console.log("loginFun",val)
    setLoading(true);
    // setIsLoginModalOpen(false)
    try {
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.login}`,
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
      if (result?.status >= 200 && result?.status <= 300) {
        form.resetFields(null);
        stopLoadingBar();
        setLoading(false);
        dispatch(
          setUserLoginDetailDispatch({
            userId: result?.id,
            name: result?.name,
            useraccessToken: result?.useraccesstoken,
          }),
        );
        setIsLoginModalOpen(false);

        // console.log("logindata", result);

        toast.success(result?.message);
      }
      if (result.status >= 400 && result?.status <= 550) {
        setIsLoginModalOpen(true);
        stopLoadingBar();
        setLoading(false);
        toast?.error(result?.message);
      }
    } catch (error) {
      setLoading(false);
      setIsLoginModalOpen(true);

      stopLoadingBar();

      // console.error('Error:', error);
      toast.error("server error");
    }
  };
  // login fun is start end here

  // signin with google fun is start from here
  const SignWithGoogle = () => {
    setSignGoogleBtnLoader(true);
    signIn("google");
    if (session == "authenticated") {
      setSignGoogleBtnLoader(false);
    }
  };
  // signin with google fun is end here

  return (
    <Modal
      className="h-[500px]"
      open={isLoginModalOpen}
      onOk={handleOk}
      footer={false}
      onCancel={handleCancel}
    >
      <div className="my-[25px]">
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

          <div className="flex flex-col gap-3">
            {loading == false ? (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bgClr bg-darkGreen! text-white! text-[16px]! py-[16px]! font-Poppins! hover:bg-darkGreen focus:bg-darkGreen active:bg-darkGreen"
              >
                Login
              </Button>
            ) : (
              <Button
                type="primary"
                className="w-full bg-darkGreen! text-white! py-[16px]! font-Poppins! hover:bg-darkGreen focus:bg-darkGreen active:bg-darkGreen"
              >
                <LoadingOutlined className="text-lightGreen text-[24px]" spin />
              </Button>
            )}
            <p className="text-center">or</p>
            {signGoogleBtnLoader == false ? (
              <Button
                className="bg-lightGreen! text-darkGreen! text-[16px]! font-Poppins! py-[16px]!"
                onClick={SignWithGoogle}
              >
                Sign in with Google
              </Button>
            ) : (
              <Button className="bg-lightGreen! text-darkGreen! font-Poppins! py-[16px]">
                {" "}
                <LoadingOutlined
                  className="text-darkGreen! text-[24px]! "
                  spin
                />
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <label
              className="text-darkGreen cursor-pointer font-Poppins"
              onClick={openSignupModal}
            >
              New here? SignUp
            </label>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UserLogin;
