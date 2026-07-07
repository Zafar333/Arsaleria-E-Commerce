"use client"
import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify';
import { CiUser } from 'react-icons/ci';
import { IoArrowBackOutline } from 'react-icons/io5';
import { DevelopmentBaseUrl } from '@/utils/api/main';
import { userEndPoints } from '@/utils/api/user';

const UserForgotPasswordEmailModal = ({setUserForgotOtpModal, UserforgotEmailModal ,setUserForgotEmailModal,}) => {
      // logiform functions is start from here
    
    const onFinish = (values) => {
      if(values){
      if(values){
        gotoCheckEmailUser(values)
      }


      }
    };
    const onFinishFailed = (errorInfo) => {
      // console.log('Failed:', errorInfo);
      toast.error("Please enter your email")
    };
    // logiform functions is end here

    // gotoCheckEmailUser fun is start from here
    const gotoCheckEmailUser=async(val)=>{

      try{
      let res=await fetch(`${DevelopmentBaseUrl}${userEndPoints?.resetPasswordSendOtpEmail}`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(val),
        credentials: "include"
      })
      let result=await res.json()
      if(result?.status>=200 && result?.status<=300 ){
        setUserForgotEmailModal(false)
        setUserForgotOtpModal(true)
        return toast.success(result?.message)
      }
      if(result?.status>=400 && result?.status<=550){
         return toast.error(result?.message)
      }
    }catch(error){
      // console.log("UserForgotPasswordEmailModal",error?.message)
      return toast.error("server error")
    }
    }
    // gotoCheckEmailUser fun is end here

    // goToAdminLogin fun is start from here
    const goToAdminLogin=()=>{
      setUserForgotEmailModal(false)
    }
    // goToAdminLogin fun is end here
     // handleCancel modal fun is start from here
     const handleCancel=()=>{
      setUserForgotEmailModal(false)
  }
  // handleCancel modal fun is end here

  return (
    <Modal open={UserforgotEmailModal} footer={false} onCancel={handleCancel}  mask={{ closable: false }}
    keyboard={false} >
      <div className='mt-[10px] flex flex-col gap-1 xs:gap-3'>
        <p className='text-[16px] sm:text-[20px] text-darkGreen'>Forgot Password</p>
        <p className='text-gray-400 font-Poppins text-[11px] sm:text-[14px]'>Please enter your email to reset the password</p>
        </div>
    <Form
      className='mt-[8px] xs:mt-[15px]'
      layout='vertical'
       labelCol={{
         span: 8,
       }}
       
       initialValues={{
         remember: true,
       }}
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
       autoComplete="off"
     >
       <Form.Item
        className='mb-[14px] xs:mb-[24px]'
        
         label={<span className="text-darkGreen text-[12px] sm:text-[14px]">Email</span>}
         name="email"
         rules={[
           {
             required: true,
             message: 'Please enter your email!',
           },
           {
               type:"email",
               message:"please enter valid email"
           }
         ]}
       >
         <Input prefix={<CiUser className='text-[15px] text-gray-400'/>} placeholder='Enter your email' />
       </Form.Item>
       <Button htmlType='submit' className='w-[160px] xs:w-full text-[16px] sm:text-[18px] text-white bg-darkGreen py-[20px]' >Reset Password</Button>
       </Form>
       </Modal>
   
  )

}

export default UserForgotPasswordEmailModal