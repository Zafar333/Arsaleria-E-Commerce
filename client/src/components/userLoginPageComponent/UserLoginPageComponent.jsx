"use client"
import React,{useEffect, useRef, useState} from 'react'
import Image from "next/image";
import { Button,Form, Input } from 'antd';
import { toast } from 'react-toastify';
import {signIn, useSession} from "next-auth/react"
import { DevelopmentBaseUrl } from '@/utils/api/main';
import { userEndPoints } from '@/utils/api/user';
import { LoadingOutlined } from '@ant-design/icons';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
import { useRouter } from "next/navigation"
import UserForgotPasswordEmailModal from '@/components/userForgotPasswordModals/userForgotPasswordEmailModal/UserForgotPasswordEmailModal';
import UserForgotPasswordOtpModal from '@/components/userForgotPasswordModals/userForgotPasswordOtpModal/UserForgotPasswordOtpModal';
import UserForgotPasswordModal from '@/components/userForgotPasswordModals/userForgotPasswordModal/UserForgotPasswordModal';
import UserUpdatedPasswordSuccessModal from '@/components/userForgotPasswordModals/userUpdatedPasswordSuccessModal/UserUpdatedPasswordSuccessModal';







 



const UserLoginPageComponent = () => {
    const session=useSession()
    const router=useRouter()
    const calledRef = useRef(false);
    // console.log("current user session",session)
    //  const { data: session } = useSession()
    const [loginData, setLoginData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [signGoogleBtnLoader, setSignGoogleBtnLoader] = useState(false);
    const [UserforgotEmailModal,setUserForgotEmailModal]=useState(false)
    const [userForgotOtpModal,setUserForgotOtpModal]=useState(false)
    const [userForgotPasswordModal,setUserForgotPasswordModal]=useState(false)
    const [userUpdatedPasswordSuccessModal,setUserUpdatedPasswordSuccessdModal]=useState(false)
    const [signinWithGoogle,setSigninWithGoogle]=useState(false)


useEffect(() => {
    // if( session?.status =="authenticated" && session?.data?.idToken ){
    if(session?.data?.idToken ){
    console.log("userrrrrrrr1",session)
    // sendToBackendGoogleAuth(session?.data?.idToken)
  }
   
  }, [session])




// logiform functions is start from here
const onFinish = (values) => {
  // console.log('Success:', values);
  setLoginData(values)
 
  if(values){
  // console.log('login ha g:', values);
    loginFun(values)
  }
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  toast.error("Please enter your credentials")
};
// logiform functions is end here

  
// login fun is start from here
const loginFun=async(val)=>{
  // console.log("loginFun",val)
  setLoading(true)
    try {
      const response = await fetch(`${DevelopmentBaseUrl}${userEndPoints?.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
         body:JSON.stringify(val),
      });

      
      // Handle successful response
      const result = await response.json();
      if(result?.status>=200 && result?.status<=300){
        setLoading(false)
        // const token =Cookies.get('auth_token'); // Only works if not HttpOnly
      // console.log("logindata",result);
         router.replace("/")
         return toast.success(result?.message)
      }
      if(result.status>=400&& result?.status<=550){
        setLoading(false)
        return toast?.error(result?.message)
      }
    } catch (error) {
      setLoading(false)
      // console.error('UserLoginPageComponent:', error?.message);
      return toast.error("server error")
    }
  
   
}
// login fun is start end here

// openSignupModal is start from here
const openSignupModal=()=>{
  router.replace("/userSignup")
  // setIsSignUpModalOpen(true)

}

// openSignupModal is end here


// signin with google fun is start from here
const SignWithGoogle=async()=>{
  try{
  setSignGoogleBtnLoader(true)
  //  setSigninWithGoogle(true) 
  const result=await signIn("google")

}catch(error){
  // console.log("signin with google error",error?.message)
  return toast.error("server error")
}
}
// signin with google fun is end here




// openForgotEmailModalFun IS START FROM HERE
const openForgotEmailModalFun=()=>{
  setUserForgotEmailModal(true)
}
// openForgotEmailModalFun IS END HERE








  return (
    <div className='w-full h-screen px-2 xs:px-5 sm:px-10 md:px-20 xl:px-40 2xl:px-60 py-5 [@media(min-height:600px)]:py-10 [@media(min-height:700px)]:py-14 [@media(min-height:750px)]:py-24 grid grid-cols-[1fr_3fr]'>
      {/* comany logo section is start from here */}
      {/* <div></div> */}
      <div  className='shadow-md bg-lightGreen rounded-tl-lg rounded-bl-lg flex items-center justify-center relative'>
        <Image className='max-w-[60px] xs:max-w-[90px] sm:max-w-[120px] lg:max-w-[200px] object-contain'
         src="/companyLogo/companylogo.png"
         alt="image"
         width={200}
         height={200}
         />
      </div>
      {/* comany logo section is end from here */}


      {/* login form section is start from here */}

      <div className='px-2 sm:px-5 md:px-10 lg:px-20 py-14 [@media(min-height:700px)]:py-24 bg-gray-50 shadow-md'>
        <div className='text-center mt-2 mb-8'>
        <p className='text-[25px] sm:text-[30px] md:text-[40px] font-Poppins text-darkGreen '>Login</p>
        </div>
        <Form
         className=''
           layout='vertical'
            name="basic"
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
              <Input placeholder='Enter Your email' prefix={<AiOutlineMail className='text-[15px] text-gray-400'/>} />
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
              <Input.Password placeholder='Enter your password'  prefix={<RiLockPasswordLine className='text-gray-400 text-[15px]'/>}/>
            </Form.Item>
            <p className='mt-3 font-Poppins text-end text-[16px] text-darkGreen cursor-pointer' onClick={openForgotEmailModalFun}>Forgot password?</p>

        
            
            <div  className='flex flex-col gap-3'>
              {loading==false?(
              <Button type='primary' htmlType="submit" className='w-full bg-darkGreen! text-white! text-[16px]! sm:text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!'>
                Login
              </Button>):(
              <Button   type='primary' className='w-full bg-darkGreen! text-white! text-[18px]! py-[20px]! font-Poppins! hover:bg-darkGreen! focus:bg-darkGreen! active:bg-darkGreen!'>
                <LoadingOutlined className='text-lightGreen text-[24px]' spin />
              </Button>
              )
        }
              <p className='text-center'>or</p>
              {signGoogleBtnLoader==false?(
              <Button className='bg-black! bgClr text-white! text-[14px]! xs:text-[16px]! sm:text-[20px]! font-Poppins! py-[20px]!' onClick={SignWithGoogle}>Sign in with Google</Button>
              ):(
              <Button className='bg-black! bgClr text-white! text-[20px]! font-Poppins! py-[20px]!' > <LoadingOutlined className='text-lightGreen text-[24px] ' spin /></Button>
        
        
              )}
              </div>
            
               <div className='text-center mt-4'> 
                <p className='text-darkGreen cursor-pointer font-Poppins' onClick={openSignupModal }>New here? SignUp</p>
                </div>
          </Form>
      
      </div>
      {/* login form section is end here */}



      {/* forget eamil modal is start from here */}
       {UserforgotEmailModal==true?(
      <UserForgotPasswordEmailModal setUserForgotOtpModal={setUserForgotOtpModal} setUserForgotEmailModal={setUserForgotEmailModal} UserforgotEmailModal={UserforgotEmailModal}/>

       ):(null)}
      {/* forget eamil modal is end here */}


      {/* UserForgotPasswordOtpModal component is start from here */}
      {userForgotOtpModal==true?(
      <UserForgotPasswordOtpModal setUserForgotPasswordModal={setUserForgotPasswordModal} setUserForgotEmailModal={setUserForgotEmailModal} userForgotOtpModal={userForgotOtpModal} setUserForgotOtpModal={setUserForgotOtpModal} />
      ):(null)}
      {/* UserForgotPasswordOtpModal component is end here */}


      {/* UserForgotPasswordModal component is start from here */}
      <UserForgotPasswordModal setUserUpdatedPasswordSuccessdModal={setUserUpdatedPasswordSuccessdModal} setUserForgotOtpModal={setUserForgotOtpModal} setUserForgotPasswordModal={setUserForgotPasswordModal} userForgotPasswordModal={userForgotPasswordModal}/>
      {/* UserForgotPasswordModal component is end here */}


      {/*  UserUpdatedPasswordSuccessModal component is start from here */}
    
    <UserUpdatedPasswordSuccessModal userUpdatedPasswordSuccessModal={userUpdatedPasswordSuccessModal} setUserUpdatedPasswordSuccessdModal={setUserUpdatedPasswordSuccessdModal} />
    {/*  UserUpdatedPasswordSuccessModal component is end here */}
    </div>

    
  )
}

export default UserLoginPageComponent


























































