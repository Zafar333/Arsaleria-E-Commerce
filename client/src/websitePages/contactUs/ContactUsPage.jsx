"use client"
import React from 'react'
import "./contactUs.css"
import { Button, Form, Input } from 'antd';

const ContactUsPage = () => {
  const { TextArea } = Input;


  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <div>
        <div className='h-[300px] contantusBgImg'>
            <div className='absolute right-[20px] h-[300px] flex items-center text-[35px] font-Poppins text-darkGreen font-bold'>ContactUs</div>
            <img src="/contactusPageImgs/contactPhnImg.png" alt="" className='w-full md:w-[400px] lg:w-[530px] xl:w-[700px] 2xl:w-[800px] h-[300px] relative opacity-35' />
            {/* <img src="/contactusPageImgs/imgBgcolor.png" alt="" className='w-full' /> */}
        </div>

        {/* contact us form is start from here */}
        
        <div className='mt-[60px] sm:mt-[100px] flex flex-col items-center px-[20px] sm:px-0]'>
          <div className='mb-4' >
            <p className='text-[28px] text-darkGreen font-Poppins' >Let&quot;s talk with us</p>
          </div>
        <Form
        className='py-[20px] px-[20px] bg-gray-100 rounded-sm w-full'
        layout='vertical'
    name="basic"
    labelCol={{
      span: 8,
    }}
    // wrapperCol={{
    //   span: 16,
    // }}
    style={{
      maxWidth: 600,
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
      name="username"
      rules={[
        {
          required: true,
          message: 'Please enter your name!',
        },
      ]}
    >
      <Input placeholder='Enter Your Name'/>
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        { type:"email",
          required: true,
          message: 'Please enter correct email!'
        }
      ]}
    >
      <Input placeholder='Enter Your Email'/>
    </Form.Item>
    <Form.Item name="description" label="Description" rules={[{required:true, message:"write message"}]}>
          <TextArea rows={4} placeholder='Your message ...' />
        </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" className='text-white bg-darkGreen text-[16px] font-Poppins'>
        Submit
      </Button>
    </Form.Item>
  </Form>

        </div>
        {/* contact us form is end here */}
    </div>
  )
}

export default ContactUsPage