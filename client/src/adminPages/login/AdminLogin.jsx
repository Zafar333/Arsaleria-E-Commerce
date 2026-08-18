"use client";
import ForgotOtpModal from "@/components/forgotPasswordModals/forgotOtp/ForgotOtpModal";
import ForgotPasswordModal from "@/components/forgotPasswordModals/forgotPassword/ForgotPasswordModal";
import ForgotEmailModal from "@/components/forgotPasswordModals/fotgotEmail/ForgotEmailModal";
import SuccessModal from "@/components/forgotPasswordModals/successModal/SuccessModal";
import { setAdminLoginDetailDispatch } from "@/store/adminDetailSlice";
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
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { RiAdminLine, RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./adminLogin.css";

const AdminLogin = () => {
  const [form] = Form.useForm();

  const navigate = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [forgotEmailModal, setForgotEmailModal] = useState(false);
  const [forgotOtpModal, setForgotOtpModal] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    stopLoadingBar();
  }, []);

  // gotoForgotPasswordModal is start from here
  const gotoForgotEmailModal = async () => {
    setForgotEmailModal(true);
  };
  // gotoForgotPasswordModal is end here

  // logiform functions is start from here

  const onFinish = (values) => {
    if (values) {
      // console.log('login:', values);
      adminLoginFun(values);
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    toast.error("Please enter your credentials");
  };
  // logiform functions is end here

  // login fun is start from here
  const adminLoginFun = async (val) => {
    // console.log("adminloginFun",val)
    setLoading(true);
    // setIsLoginModalOpen(false)
    try {
      startLoadingBar();
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminLoginEndpoints?.login}`,
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
      if (result?.status >= 200 && result?.status < 400) {
        form.resetFields(null);
        // console.log("adminlogin data",result)
        dispatch(
          setAdminLoginDetailDispatch([
            { id: result.id, adminaccestoken: result?.adminaccestoken },
          ]),
        );
        setLoading(false);
        setPageLoading(true);
        toast.success(result?.message);
        navigate.replace(
          `${frontendDevelopmentBaseUrl}/admin?id=${result?.id}`,
        );
      }
      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        setLoading(false);
        toast?.error(result?.message);
      }
    } catch (error) {
      stopLoadingBar();

      setLoading(false);
      // console.error('Error:', error);
      toast.error("server error");
    }
  };
  // login fun is start end here

  return (
    <div className="bg-lightGreen adminContainer flex justify-center items-center ">
      {pageLoading == false ? (
        <div className="mx-[20px] my-[15px] sm:my-0 sm:mx-0 h-[460px] shadow-lg bg-white w-[600px] rounded-md">
          <div className="my-[30px] mx-[25px]">
            <div className="mb-[5px]">
              <RiAdminLine className="text-lightGreen text-[50px] sm:text-[80px] m-auto" />
            </div>
            <p className="mb-[15px] font-Poppins text-[24px] text-darkGreen font-bold text-center">
              Admin Login
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
                  prefix={<CiUser className="text-[15px] text-gray-400" />}
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

              <div className="flex flex-col gap-3">
                {loading == false ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full bgClr bg-darkGreen! text-white! text-[16px]! py-[16px]! md:py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    className="w-full bg-darkGreen!  text-[16px]! py-[16px]! md:py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!"
                  >
                    <LoadingOutlined
                      className="text-lightGreen! text-[24px]!"
                      spin
                    />
                  </Button>
                )}
                {/* <p className='text-center'>or</p>
            {signGoogleBtnLoader==false?(
            <Button className='bg-black text-white text-[20px] font-Poppins py-[20px]' onClick={SignWithGoogle}>Sign in with Google</Button>
            ):(
            <Button className='bg-black text-white text-[20px] font-Poppins py-[20px]' > <LoadingOutlined className='text-lightGreen text-[24px] ' spin /></Button>
      
      
            )} */}
              </div>

              <div className="text-center mt-2">
                <label
                  className="text-darkGreen cursor-pointer font-Poppins tex-[12px]"
                  onClick={gotoForgotEmailModal}
                >
                  Forgot Password?
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
      {forgotEmailModal ? (
        <ForgotEmailModal
          setForgotOtpModal={setForgotOtpModal}
          forgotEmailModal={forgotEmailModal}
          setForgotEmailModal={setForgotEmailModal}
        />
      ) : null}
      <ForgotOtpModal
        setForgotPasswordModal={setForgotPasswordModal}
        forgotOtpModal={forgotOtpModal}
        setForgotOtpModal={setForgotOtpModal}
        setForgotEmailModal={setForgotEmailModal}
      />
      <ForgotPasswordModal
        setSuccessModal={setSuccessModal}
        setForgotPasswordModal={setForgotPasswordModal}
        forgotPasswordModal={forgotPasswordModal}
        setForgotOtpModal={setForgotOtpModal}
      />
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        setForgotPasswordModal={setForgotPasswordModal}
      />
    </div>
  );
};

export default AdminLogin;
