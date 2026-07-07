"use client"
import React, { useState } from 'react'
import { Modal } from 'antd';
import { Button,Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { DevelopmentBaseUrl } from '@/utils/api/main';
import { userEndPoints } from '@/utils/api/user';
import { LoadingOutlined } from '@ant-design/icons';
import { CiUser } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';


const UserSignup = ({isLoginModalOpen,setIsLoginModalOpen,setIsSignUpModalOpen,isSignUpModalOpen}) => {

  const [signupData, setSignupData] = useState();
  const [signupLoader, setSignupLoader] = useState(false);

// logiform functions is start from here
const onFinish = (values) => {
  setSignupLoader(true)
  setSignupData(values)
  if(values){
    signUpFun(values)  }
};
const onFinishFailed = (errorInfo) => {
  // console.log('Failed:', errorInfo);
  toast.error("Please enter your credentials")
};
// logiform functions is end here


// modal function is start from here   
    const handleOk = () => {
      setIsSignUpModalOpen(false);
    };
    const handleCancel = () => {
      setIsSignUpModalOpen(false);
    };
// modal function is start end here  

// openSignupModal is start from here
const openLoginModal=()=>{
  setIsLoginModalOpen(true)
  setIsSignUpModalOpen(false)

}

// openSignupModal is end here

// login fun is start from here
const signUpFun=async(val)=>{
  // console.log("signupdatag",val)
  try {
    const response = await fetch(`${DevelopmentBaseUrl}${userEndPoints?.registration}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val)
    });
    // if (!response.ok) throw new Error('Submission failed');
    // Handle successful response
    const result = await response.json();
    // console.log("result",result)
    if(result?.status>=200 && result?.status<=300){
      setSignupLoader(false)
    toast.success(result?.message);
    }
    if(result?.status>=400&& result?.status<=550){
      setSignupLoader(false)

      toast.error(result?.message)
    }
  } catch (error) {
    setSignupLoader(false)

    toast.error("server error");
  }
    setIsSignUpModalOpen(false)
}
// login fun is start end here
  return (
    <Modal className='h-[500px]' open={isSignUpModalOpen} onOk={handleOk} footer={false} onCancel={handleCancel}>
<div className='my-[25px]'>
<Form
 className=''
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
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please enter your name!',
          
        },
       
      ]}
    >
      <Input prefix={<CiUser className='text-[15px] text-gray-400'/>} placeholder='Enter Your Name' />
    </Form.Item>
    <Form.Item
      label="Email"
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
      <Input prefix={<AiOutlineMail className='text-[15px] text-gray-400'/>} placeholder='Enter your email'/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please enter your password!',
        },
      ]}
    >
      <Input.Password prefix={<RiLockPasswordLine className='text-gray-400 text-[15px]'/>} placeholder='Enter your password' />
    </Form.Item>

    
    <div >
      {signupLoader==false?(
       <Button type="primary" htmlType="submit" className='w-full  bg-darkGreen text-[18px] py-[20px] font-Poppins'>
        Signup
       </Button>
      ):(
        <Button type="primary"  className='w-full  bg-darkGreen text-[18px] py-[20px] font-Poppins'>
        <LoadingOutlined className='text-[24px] text-lightGreen' spin/>
        </Button>

      )}
      </div>
    
       <div className='text-center mt-4'> 
        <label className='text-darkGreen cursor-pointer font-Poppins text-[14px] ' onClick={openLoginModal}>if you  have already Account? Login</label>
        </div>
  </Form>
  </div>
  </Modal>

  )
}

export default UserSignup