"use client";
import {
    startLoadingBar,
    stopLoadingBar,
} from "@/topLoadingBarComponent/TopLoadingBarComponent";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { userEndPoints } from "@/utils/api/user";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const UserForgotPasswordModal = ({
  setUserUpdatedPasswordSuccessdModal,
  setUserForgotOtpModal,
  setUserForgotPasswordModal,
  userForgotPasswordModal,
}) => {
  const [form] = Form.useForm();
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    if (userForgotPasswordModal == true) {
      stopLoadingBar();
    }
  }, []);
  // handleCancel modal fun is start from here
  const handleCancel = () => {
    setUserForgotPasswordModal(false);
  };
  // handleCancel modal fun is end here

  // goToForgotOtpModal fun is start from here
  const goToForgotOtpModal = () => {
    startLoadingBar();
    setUserForgotPasswordModal(false);
    setUserForgotOtpModal(true);
  };
  // goToForgotOtpModal fun is end here

  const onFinish = (values) => {
    try {
      if (values?.password == values?.confirmPassword) {
        // return toast.success(`password: ${values?.password}`)
        return updatePasswordFun(values);
      } else {
        return toast.error("please enter same password");
      }
    } catch (error) {
      //   console.log("forgot password modal error", error);
      toast.error("server error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    return toast.error("Please fill all digits");
  };

  // updatePasswordFun IS START FROM HERE
  const updatePasswordFun = async (pass) => {
    try {
      startLoadingBar();
      setBtnLoader(true);
      const res = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.updateForgotPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pass),
          credentials: "include",
          cache: "no-store",
        },
      );

      let result = await res.json();
      if (result?.status >= 200 && result?.status <= 300) {
        form.resetFields(null);
        setUserForgotPasswordModal(false);
        return setUserUpdatedPasswordSuccessdModal(true);
        // return toast.success(result?.message)
      }
      if (result?.status >= 400 && result?.status <= 550) {
        stopLoadingBar();
        setBtnLoader(true);

        return toast.error(result?.message);
      }
    } catch (error) {
      // console.log("UserForgotPasswordModal",error?.message)
      stopLoadingBar();
      setBtnLoader(true);

      return toast.error("server error");
    }
  };
  // updatePasswordFun IS END HERE

  return (
    <Modal
      className=""
      onCancel={handleCancel}
      open={userForgotPasswordModal}
      footer={false}
      mask={{ closable: false }}
      keyboard={false}
    >
      <IoArrowBackOutline
        className="text-[20px] text-gray-400 cursor-pointer mb-[8px]"
        onClick={goToForgotOtpModal}
      />
      <div className="flex flex-col gap-2 xs:gap-3">
        <p className=" text-[16px] sm:text-[20px] text-darkGreen">
          Set a new password
        </p>
        <p className="text-gray-400 font-Poppins xs:text-[16px] text-[10px]">
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
      </div>
      <Form
        form={form}
        className="mt-[9px] xs:mt-[15px]"
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
          className=""
          label={
            <span className=" text-darkGreen text-[13px] mb-[0px] sm:mb-[7px]">
              Password
            </span>
          }
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className=""
          label={
            <span className="text-darkGreen text-[13px] mb-[7px]">
              Confirm Password
            </span>
          }
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please enter password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {btnLoader == false ? (
          <Button
            htmlType="submit"
            className="w-full text-[14px]! md:text-[18px]! text-darkGreen! font-Poppins! bg-lightGreen! py-[16px]! md:py-[20px]!"
          >
            Update Password
          </Button>
        ) : (
          <Button className="w-full bg-lightGreen! bgClr py-[16px]! md:py-[20px]!">
            {" "}
            <LoadingOutlined className="text-darkGreen! text-[24px]! " spin />
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default UserForgotPasswordModal;
