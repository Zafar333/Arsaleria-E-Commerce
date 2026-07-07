"use client"
import { Button, Form, Modal,Input } from 'antd';
import React, { useRef, useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

const ForgotOtpModal = ({ setForgotPasswordModal,forgotOtpModal,setForgotOtpModal,setForgotEmailModal}) => {

    const [otp, setOtp] = useState(Array(5).fill(''));
    const inputsRef=useRef([])


    // goToForgotEmailModal fun is start from here
    const goToForgotEmailModal=()=>{
        setOtp(Array(5).fill(''))
        setForgotOtpModal(false)
        setForgotEmailModal(true)
    }
    // goToForgotEmailModal fun is end here


    // handleChange is start from here  
    const handleChange=(val,ind)=>{
        if (!/^\d?$/.test(val)) return; // Allow only digits
        console.log("handleChange",val,ind)
     const newOtp=[...otp]
     newOtp[ind]=val
     setOtp(newOtp)
     if(val && ind<5){
        inputsRef.current[ind+1]?.focus()
        console.log("ref",inputsRef)

     }

    }
    // handleChange is end here 
    
    


        // VerifyOtp functions is start from here
        
        const onFinish = (values) => {
          if(values){
              let data=otp.join('')
            //   console.log('myotp', data);
            setForgotOtpModal(false)
            setForgotPasswordModal(true)

          }
        };
        const onFinishFailed = (errorInfo) => {
          // console.log('Failed:', errorInfo);
          toast.error("Please fill all digits")
        };
        // VerifyOtp functions is end here

        // handleKeyDown fun is start from here

        const handleKeyDown = (e, index) => {
            if (e.key === 'Backspace' && !otp[index] && index > 0) {
              inputsRef.current[index - 1]?.focus();
            }
          };
        // handleKeyDown fun is end here

    


        // handleCancel modal fun is start from here
        const handleCancel=()=>{
            setForgotOtpModal(false)
        }
        // handleCancel modal fun is end here
  return (

      <Modal className='' onCancel={handleCancel} open={forgotOtpModal} footer={false} Closable={false} keyboard={false}>
        <IoArrowBackOutline className='text-[20px] text-gray-400 cursor-pointer mb-[8px]' onClick={goToForgotEmailModal} />
        <div className='flex flex-col gap-2 xs:gap-3'>
            <p className='text-[20px] text-darkGreen'>Check your email</p>
            <p className='text-gray-400 font-Poppins xs:text-[16px] text-[12px]'>We sent a code on your email
            enter 5 digit code that mentioned in the email</p>
            </div>
        <Form
        className='mt-[7px] xs:mt-[15px]'
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
            className='mt-[2px]'
            
             label={<span className="text-darkGreen text-[14px] mb-[7px]">Enter 5-digit OTP</span>}
             name="otp"
             rules={[
               {
                 required: true,
                 message: 'Please enter all digits!',
               },
              
             ]}
           >
            <div className='mt-[5px] xs:mt-0 flex gap-[10px] sm:gap-[20px] justify-center'>
            {otp?.map((digit, index) => (
             <Input key={index}  onKeyDown={(e) => handleKeyDown(e, index)} value={digit}  ref={(el) => (inputsRef.current[index] = el)} max={1} onChange={(e)=> handleChange(e.target.value,index)} className=' w-[33px] h-[33px] xs:h-[40px] xs:w-[40px] text-center text-[18px]' />
            ))}
            </div>
           </Form.Item>
           <Button htmlType='submit' className='w-full text-[18px]! text-darkGreen! font-Poppins! bg-lightGreen! py-[20px]!'>Verify</Button>
           </Form>
           <div className='text-center mt-[10px]'>
            <label className='text-darkGreen text-[12px] xs:text-[14px]'>Haven’t got the email yet? <a className=' font-Poppins text-blue-600'>Resend email</a></label>
           </div>
           </Modal>
  )
}

export default ForgotOtpModal