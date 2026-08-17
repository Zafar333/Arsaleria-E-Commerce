"use client";
import { Button, Modal } from "antd";
import { TiTick } from "react-icons/ti";

const UserUpdatedPasswordSuccessModal = ({
  userUpdatedPasswordSuccessModal,
  setUserUpdatedPasswordSuccessdModal,
  setForgotPasswordModal,
}) => {
  // gotoLoginPage fun is start from here
  const gotoLoginPage = () => {
    setUserUpdatedPasswordSuccessdModal(false);
  };
  // gotoLoginPage fun is end here
  return (
    <Modal
      open={userUpdatedPasswordSuccessModal}
      footer={false}
      closeIcon={false}
      mask={{ closable: false }}
      keyboard={false}
      onClose={false}
    >
      <div className="flex flex-col gap-2 xs:gap-3">
        <p className="text-[20px] sm:text-[24px] text-darkGreen text-center">
          Successful
        </p>
        <p className="text-gray-400 font-Poppins sm:text-[16px] text-[14px] mb-2">
          Congratulations! Your password has been changed. Click continue to
          login
        </p>

        <div className="flex justify-center mb-5">
          <div className="w-fit rounded-[28px] p-[13px] border-2 border-lightGreen">
            <TiTick className="text-[25px] text-lightGreen" />
          </div>
        </div>
      </div>
      <Button
        className="w-full text-darkGreen! bg-lightGreen! py-[18px]! md:py-[22px]! font-Poppins! text-[14px]! md:text-[18px]!"
        onClick={gotoLoginPage}
      >
        Continue to login
      </Button>
    </Modal>
  );
};

export default UserUpdatedPasswordSuccessModal;
