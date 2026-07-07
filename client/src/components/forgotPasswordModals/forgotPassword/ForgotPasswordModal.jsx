"use client"
import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

const ForgotPasswordModal = ({setSuccessModal,setForgotOtpModal,setForgotPasswordModal,forgotPasswordModal}) => {
    
        // handleCancel modal fun is start from here
        const handleCancel=()=>{
            setForgotPasswordModal(false)
        }
        // handleCancel modal fun is end here

        // goToForgotOtpModal fun is start from here
        const goToForgotOtpModal=()=>{
         setForgotPasswordModal(false)
         setForgotOtpModal(true)


        }
        // goToForgotOtpModal fun is end here


          const onFinish = (values) => {
                  if(values?.password==values?.confirmPassword){
                    toast.success("password is match")
                    setForgotPasswordModal(false)
                    setSuccessModal(true)
                  }
                  else{
                    toast.error("please enter same password")
                  }
                };
                const onFinishFailed = (errorInfo) => {
                  // console.log('Failed:', errorInfo);
                  toast.error("Please fill all digits")
                };
  return (
    <Modal className='' onCancel={handleCancel} open={forgotPasswordModal} footer={false} mask={{closable:false}} keyboard={false}>
    <IoArrowBackOutline className='text-[20px] text-gray-400 cursor-pointer mb-[8px]' onClick={goToForgotOtpModal} />
           <div className='flex flex-col gap-2 xs:gap-3'>
               <p className='text-[20px] text-darkGreen'>Set a new password</p>
               <p className='text-gray-400 font-Poppins xs:text-[16px] text-[12px]'>Create a new password. Ensure it differs from
               previous ones for securit</p>
               </div>
           <Form
           className='mt-[9px] xs:mt-[15px]'
             layout='vertical'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
               className=''
               
                label={<span className="text-darkGreen text-[14px] mb-[0px] xs:mb-[7px]">Password</span>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please enter password!',
                  }
                ]}
              >
               
                <Input.Password  />
            
               
              </Form.Item>
              <Form.Item
               className=''
               
                label={<span className="text-darkGreen text-[14px] mb-[7px]">Confirm Password</span>}
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please enter password!',
                  }
                ]}
              >
               
                <Input.Password  />
            
               
              </Form.Item>
              <Button htmlType='submit' className='w-full text-[18px]! text-darkGreen! font-Poppins! bg-lightGreen! py-[20px]!'>Update Password</Button>
              </Form>
             
    </Modal>
  )
}

export default ForgotPasswordModal