"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { CgMenuRightAlt } from "react-icons/cg";
import { Button } from 'antd';
import {  Modal } from 'antd';
import UserSignup from '../userSignupModal/UserSignup';
import { BsCart3 } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { setAddToCartModalDispatch } from '@/store/cartDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddToCartModal from '../addToCartModal/AddToCartModal';
import UserLogin from '@/components/userLoginModal/UserLogin';


const Header = () => {
  const dispatch=useDispatch()
  const navigate=useRouter()
  const AddToCartModalState=useSelector((state)=>state.cartDetailSlice.AddToCartModal)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [headerHighlighter, setHeaderHighlighter] = useState(["home"]);


  const [sidebar,setSidebar]=useState(false)
  const openSideBar=()=>{
  if(sidebar==true){
    setSidebar(false)
  }
  if(sidebar ==false){
    setSidebar(true)
  }

  }

  // openLoginModal fun is start from here
  const openLoginModal=()=>{
    if(isLoginModalOpen==false){
    setIsLoginModalOpen(true)
    }
   
  }
  // openLoginModal fun is end here


  // navigateFun is start from here
  const navigateFun=(data)=>{
    setHeaderHighlighter([data])
  }
  // navigateFun is end here

  // gotToContactUs fun is start from here
  const gotToContactUs=(data)=>{
    console.log("contact us fun")
    setHeaderHighlighter([data])
    navigate.push("/contactus")  

  }
  // gotToContactUs fun is end here

  // openAddToCartModal Fun is start from here
  const openAddToCartModal=()=>{
    console.log("Add to cart Modal")
    dispatch(setAddToCartModalDispatch(true))
  }
  // openAddToCartModal Fun is end here



  return (
    <div>
        <div className=" w-full h-[100px] m-auto bg-lightGreen">
        <div className="h-full flex items-center justify-between md:pl-0 pl-[20px] md:pr-0 pr-[20px] md:justify-around ">
        <p className=" text-[18px] xs:text-[22px] lg:text-[30px] xl:text-[40px] font-Elephant text-darkGreen">Fashion Fusion</p>
        {/* <div className="pl-[100px]"><img  className="text-[40px] font-Elephant text-darkGreen h-[100px] "  src={"./Fashion Fusion (1).png"}/></div> */}
        {/* for webView Menu Options is start from here */}
        <div className="hidden md:flex gap-[30px] xl:gap-[50px] items-center">
          <Link href={"/"} className={`${headerHighlighter[0]=="home"?"border-b-2 border-darkGreen":""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen`} onClick={()=>navigateFun("home")}>Home </Link>
          <Link href={"/allProducts"} className={`${headerHighlighter[0]=="allProducts"?"border-b-2 border-darkGreen":""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen`} onClick={()=>navigateFun("allProducts")} >All Products </Link>
          <Link href={""} className={`${headerHighlighter[0]=="categories"?"border-b-2 border-darkGreen":""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen`} onClick={()=>navigateFun("categories")}>Categories </Link>
          <label  className={`${headerHighlighter[0]=="contactus"?"border-b-2 border-darkGreen":""} font-Poppins text-[16px] lg:text-[22px] text-darkGreen cursor-pointer`} onClick={()=>gotToContactUs("contactus")}>Contact Us </label>
          <BsCart3 className="text-[25px] text-darkGreen cursor-pointer" onClick={openAddToCartModal} />
          <Button  className='!text-[20px] !p-[20px] !text-darkGreen !font-Poppins !bg-lightGreen border !border-darkGreen' onClick={openLoginModal}>Login</Button>
        </div>
        {/* for webView Menu Options is end here */}

        {/* mobile view menu icon is start from here */}
           <div className="flex items-center gap-[10px] xs:gap-[20px] md:hidden" onClick={openSideBar}>
          <BsCart3 className="text-[20px] xs:text-[23px] text-darkGreen cursor-pointer" onClick={openAddToCartModal} />
          <CgMenuRightAlt  className="text-[24px] xs:text-[30px] text-darkGreen" />

          </div>

        {/* mobile view menu icon is end here */}
        </div>
        

        
      </div>
      {/* for mobile view menu options */}
         <div className={`${sidebar==true?("block"):"hidden"} bg-darkGreen h-fit py-[20px]`} >

          <div className="flex flex-col md:hidden gap-[20px] items-center  ">
          <Link href={"/"} className={`${headerHighlighter[0]=="home"?"border-b-2 border-lightGreen":""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen`} onClick={()=>navigateFun("home")}>Home </Link>
          <Link href={"/allProducts"} className={`${headerHighlighter[0]=="allProducts"?"border-b-2 border-lightGreen":""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen`} onClick={()=>navigateFun("allProducts")} >All Products </Link>
          <Link href={""} className={`${headerHighlighter[0]=="categories"?"border-b-2 border-lightGreen":""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen`} onClick={()=>navigateFun("categories")}>Categories </Link>
          <label className={`${headerHighlighter[0]=="contactus"?"border-b-2 border-lightGreen":""} font-Poppins text-[16px] lg:text-[22px] text-lightGreen cursor-pointer`} onClick={()=>gotToContactUs("contactus")}>Contact Us </label>
          <Button className='text-[20px] py-[18px] px-[30px] text-darkGreen font-Poppins bg-lightGreen border border-darkGreen' onClick={openLoginModal}>Login</Button>
          </div>
        </div>
      {/* for mobile view menu options */}
        
    <UserLogin isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} isSignUpModalOpen={isSignUpModalOpen}  />
    <UserSignup isSignUpModalOpen={isSignUpModalOpen} setIsSignUpModalOpen={setIsSignUpModalOpen} isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
   

   {/* AddToCartModal is start from here */}
   {AddToCartModalState==true?(
   <AddToCartModal/>
   ):(null)
}
   {/* AddToCartModal is end here */}
    </div>
  )
}

export default Header