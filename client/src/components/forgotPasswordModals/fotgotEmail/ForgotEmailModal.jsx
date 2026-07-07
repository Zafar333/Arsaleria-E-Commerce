"use client"
import React from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify';
import { CiUser } from 'react-icons/ci';
import { IoArrowBackOutline } from 'react-icons/io5';
import { DevelopmentBaseUrl } from '@/utils/api/main';
import { adminLoginEndpoints } from '@/utils/api/admin/adminLogin';

const ForgotEmailModal = ({setForgotOtpModal, forgotEmailModal ,setForgotEmailModal,}) => {
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
      let res=await fetch(`${DevelopmentBaseUrl}/${adminLoginEndpoints?.resetPassword}`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(val)
      })
      let result=await res.json()
      if(result?.status==200){
        toast.success(result?.message)
        setForgotEmailModal(false)
        setForgotOtpModal(true)
      }
      if(result?.status==400){
        toast.error(result?.message)
      }
    }catch(error){
      toast.error("server error")
      // toast.error(error?.message)
    }
    }
    // gotoCheckEmailUser fun is end here

    // goToAdminLogin fun is start from here
    const goToAdminLogin=()=>{
      setForgotEmailModal(false)
    }
    // goToAdminLogin fun is end here
     // handleCancel modal fun is start from here
     const handleCancel=()=>{
      setForgotEmailModal(false)
  }
  // handleCancel modal fun is end here

  return (
    <Modal open={forgotEmailModal} footer={false} onCancel={handleCancel}  mask={{closable:false}}
    keyboard={false} >
      <div className='mt-[10px] flex flex-col gap-1 xs:gap-3'>
        <p className='text-[18px] xs:text-[20px] text-darkGreen'>Forgot Password</p>
        <p className='text-gray-400 font-Poppins text-[11px] xs:text-[14px]'>Please enter your email to reset the password</p>
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
        
         label={<span className="text-darkGreen text-[14px]">Email</span>}
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
       <Button htmlType='submit' className='w-[160px] xs:w-full text-[16px]! xs:text-[18px]! text-white! bg-darkGreen! py-[20px]!' >Reset Password</Button>
       </Form>
       </Modal>
   
  )

}

export default ForgotEmailModal