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
import { CiUser } from "react-icons/ci";
import { toast } from "react-toastify";

const UserForgotPasswordEmailModal = ({
  setUserForgotOtpModal,
  UserforgotEmailModal,
  setUserForgotEmailModal,
}) => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [form] = Form.useForm();

  // logiform functions is start from here

  useEffect(() => {
    if (UserforgotEmailModal == true) {
      stopLoadingBar();
    }
  }, []);

  const onFinish = (values) => {
    if (values) {
      if (values) {
        gotoCheckEmailUser(values);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    toast.error("Please enter your email");
  };
  // logiform functions is end here

  // gotoCheckEmailUser fun is start from here
  const gotoCheckEmailUser = async (val) => {
    try {
      setBtnLoader(true);
      startLoadingBar();
      let res = await fetch(
        `${DevelopmentBaseUrl}${userEndPoints?.resetPasswordSendOtpEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
          credentials: "include",
          cache: "no-store",
        },
      );
      let result = await res.json();
      if (result?.status >= 200 && result?.status <= 300) {
        form.resetFields(null);
        setUserForgotEmailModal(false);
        setUserForgotOtpModal(true);
        return toast.success(result?.message);
      }
      if (result?.status >= 400 && result?.status <= 550) {
        setBtnLoader(false);

        stopLoadingBar();
        return toast.error(result?.message);
      }
    } catch (error) {
      setBtnLoader(false);

      stopLoadingBar();
      // console.log("UserForgotPasswordEmailModal",error?.message)
      return toast.error("server error");
    }
  };
  // gotoCheckEmailUser fun is end here

  // goToAdminLogin fun is start from here
  const goToAdminLogin = () => {
    setUserForgotEmailModal(false);
  };
  // goToAdminLogin fun is end here
  // handleCancel modal fun is start from here
  const handleCancel = () => {
    setUserForgotEmailModal(false);
  };
  // handleCancel modal fun is end here

  return (
    <Modal
      open={UserforgotEmailModal}
      footer={false}
      onCancel={handleCancel}
      mask={{ closable: false }}
      keyboard={false}
    >
      <div className="mt-[10px] flex flex-col gap-1 xs:gap-3">
        <p className="text-[16px] sm:text-[20px] text-darkGreen">
          Forgot Password
        </p>
        <p className="text-gray-400 font-Poppins text-[11px] sm:text-[14px]">
          Please enter your email to reset the password
        </p>
      </div>
      <Form
        form={form}
        className="mt-[8px] xs:mt-[15px]"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="mb-[14px] xs:mb-[24px]"
          label={
            <span className="text-darkGreen text-[12px] sm:text-[14px]">
              Email
            </span>
          }
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
        {btnLoader == false ? (
          <Button
            htmlType="submit"
            className="w-full text-[14px]! md:text-[16px]! font-Poppins! text-darkGreen! bg-lightGreen! py-[16px]! md:py-[20px]!"
          >
            Reset Password
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

export default UserForgotPasswordEmailModal;
