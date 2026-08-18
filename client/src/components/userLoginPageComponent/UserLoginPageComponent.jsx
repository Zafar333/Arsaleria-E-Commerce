"use client";
import UserForgotPasswordEmailModal from "@/components/userForgotPasswordModals/userForgotPasswordEmailModal/UserForgotPasswordEmailModal";
import UserForgotPasswordModal from "@/components/userForgotPasswordModals/userForgotPasswordModal/UserForgotPasswordModal";
import UserForgotPasswordOtpModal from "@/components/userForgotPasswordModals/userForgotPasswordOtpModal/UserForgotPasswordOtpModal";
import UserUpdatedPasswordSuccessModal from "@/components/userForgotPasswordModals/userUpdatedPasswordSuccessModal/UserUpdatedPasswordSuccessModal";
import { setUserLoginDetailDispatch } from "@/store/userLoginDetailSlice";
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
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UserLoginPageComponent = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const session = useSession();
  const router = useRouter();
  const calledRef = useRef(false);
  // console.log("current user session",session)
  //  const { data: session } = useSession()
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signGoogleBtnLoader, setSignGoogleBtnLoader] = useState(false);
  const [UserforgotEmailModal, setUserForgotEmailModal] = useState(false);
  const [userForgotOtpModal, setUserForgotOtpModal] = useState(false);
  const [userForgotPasswordModal, setUserForgotPasswordModal] = useState(false);
  const [userUpdatedPasswordSuccessModal, setUserUpdatedPasswordSuccessdModal] =
    useState(false);
  const [signinWithGoogle, setSigninWithGoogle] = useState(false);

  useEffect(() => {
    stopLoadingBar();
  }, []);

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
    // console.log("Failed:", errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // login fun is start from here
  const loginFun = async (val) => {
    startLoadingBar();
    // console.log("loginFun",val)
    setLoading(true);
    try {
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

      // Handle successful response
      const result = await response.json();
      if (result?.status >= 200 && result?.status <= 300) {
        setLoading(false);
        form.resetFields(null);
        dispatch(
          setUserLoginDetailDispatch({
            userId: result?.id,
            name: result?.name,
            useraccessToken: result?.useraccesstoken,
          }),
        );
        // console.log("logindata",result);
        router.replace(`${frontendDevelopmentBaseUrl}/`);
        return toast.success(result?.message);
      }
      if (result.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        setLoading(false);
        return toast?.error(result?.message);
      }
    } catch (error) {
      setLoading(false);
      stopLoadingBar();

      // console.error('UserLoginPageComponent:', error?.message);
      return toast.error("server error");
    }
  };
  // login fun is start end here

  // openSignupModal is start from here
  const openSignupModal = () => {
    startLoadingBar();
    router.replace(`${frontendDevelopmentBaseUrl}/userSignup`);
    // setIsSignUpModalOpen(true)
  };

  // openSignupModal is end here

  // signin with google fun is start from here
  const SignWithGoogle = async () => {
    try {
      startLoadingBar();
      setSignGoogleBtnLoader(true);
      //  setSigninWithGoogle(true)
      const result = await signIn("google");
    } catch (error) {
      stopLoadingBar();
      // console.log("signin with google error",error?.message)
      return toast.error("server error");
    }
  };
  // signin with google fun is end here

  // openForgotEmailModalFun IS START FROM HERE
  const openForgotEmailModalFun = () => {
    startLoadingBar();
    setUserForgotEmailModal(true);
  };
  // openForgotEmailModalFun IS END HERE

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
          <p className="text-[18px] sm:text-[25px] md:text-[30px] font-Poppins text-darkGreen ">
            USER LOGIN
          </p>
        </div>
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
          <p
            className="mt-3 font-Poppins text-end text-[12px] md:text-[16px] text-darkGreen cursor-pointer"
            onClick={openForgotEmailModalFun}
          >
            Forgot password?
          </p>

          <div className="flex flex-col gap-3">
            {loading == false ? (
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-darkGreen! text-white! text-[14px]! md:text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
              >
                Login
              </Button>
            ) : (
              <Button
                type="primary"
                className="w-full bg-darkGreen! py-[20px]! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
              >
                <LoadingOutlined
                  className="text-lightGreen! text-[24px]!"
                  spin
                />
              </Button>
            )}
            <p className="text-center text-[16px] text-darkGreen font-Poppins">
              or
            </p>
            {signGoogleBtnLoader == false ? (
              <Button
                className="bg-lightGreen! bgClr text-darkGreen! text-[14px]! md:text-[18px]! font-Poppins! py-[20px]!"
                onClick={SignWithGoogle}
              >
                Sign in with Google
              </Button>
            ) : (
              <Button className="bg-lightGreen! bgClr py-[20px]!">
                {" "}
                <LoadingOutlined
                  className="text-darkGreen! text-[24px]! "
                  spin
                />
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <p
              className="text-darkGreen cursor-pointer text-[12px] md:text-[14px] font-Poppins"
              onClick={openSignupModal}
            >
              New here? SignUp
            </p>
          </div>
        </Form>
      </div>
      {/* login form section is end here */}

      {/* forget eamil modal is start from here */}
      {UserforgotEmailModal == true ? (
        <UserForgotPasswordEmailModal
          setUserForgotOtpModal={setUserForgotOtpModal}
          setUserForgotEmailModal={setUserForgotEmailModal}
          UserforgotEmailModal={UserforgotEmailModal}
        />
      ) : null}
      {/* forget eamil modal is end here */}

      {/* UserForgotPasswordOtpModal component is start from here */}
      {userForgotOtpModal == true ? (
        <UserForgotPasswordOtpModal
          setUserForgotPasswordModal={setUserForgotPasswordModal}
          setUserForgotEmailModal={setUserForgotEmailModal}
          userForgotOtpModal={userForgotOtpModal}
          setUserForgotOtpModal={setUserForgotOtpModal}
        />
      ) : null}
      {/* UserForgotPasswordOtpModal component is end here */}

      {/* UserForgotPasswordModal component is start from here */}
      <UserForgotPasswordModal
        setUserUpdatedPasswordSuccessdModal={
          setUserUpdatedPasswordSuccessdModal
        }
        setUserForgotOtpModal={setUserForgotOtpModal}
        setUserForgotPasswordModal={setUserForgotPasswordModal}
        userForgotPasswordModal={userForgotPasswordModal}
      />
      {/* UserForgotPasswordModal component is end here */}

      {/*  UserUpdatedPasswordSuccessModal component is start from here */}

      <UserUpdatedPasswordSuccessModal
        userUpdatedPasswordSuccessModal={userUpdatedPasswordSuccessModal}
        setUserUpdatedPasswordSuccessdModal={
          setUserUpdatedPasswordSuccessdModal
        }
      />
      {/*  UserUpdatedPasswordSuccessModal component is end here */}
    </div>
  );
};

export default UserLoginPageComponent;
