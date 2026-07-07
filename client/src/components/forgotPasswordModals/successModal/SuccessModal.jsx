"use client"
import { Button, Modal } from 'antd'
import React from 'react'
import { TiTick } from "react-icons/ti";

const SuccessModal = ({successModal,setSuccessModal,setForgotPasswordModal}) => {
  
  // gotoLoginPage fun is start from here
  const gotoLoginPage=()=>{
    setSuccessModal(false)

  }
  // gotoLoginPage fun is end here
  return (
    <Modal open={successModal} footer={false} closeIcon={false} mask={{closable:false}} keyboard={false} onClose={false}>
        <div className='flex flex-col gap-2 xs:gap-3'>
            <p className='text-[24px] text-darkGreen text-center'>Successful</p>
            <p className='text-gray-400 font-Poppins xs:text-[16px] text-[14px] mb-2'>Congratulations! Your password has
            been changed. Click continue to login</p>
            
            <div className='flex justify-center mb-5'>
            <div className='w-fit rounded-[28px] p-[13px] border-2 border-darkGreen'>
            <TiTick className='text-[25px] text-darkGreen' />
            </div>
            </div>
            </div>
            <Button className='w-full text-white! bg-darkGreen! py-[22px]! font-Poppins! text-[20px]! font-Poppins!' onClick={gotoLoginPage}>Continue to login</Button>
    </Modal>
  )
}

export default SuccessModal