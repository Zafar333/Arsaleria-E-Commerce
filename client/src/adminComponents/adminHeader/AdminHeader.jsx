"use client"
import React, { useEffect, useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
// import { RiMenuUnfoldFill } from "react-icons/ri";
import AdminSidebar from "@/adminComponents/adminSidebar/AdminSidebar";
import { useSelector } from 'react-redux';





const AdminHeader = ({adminProfileData}) => {
  const admindata = useSelector((state) => state.adminDetailSlice?.adminLoginDetail);
  const [openSidebar, setOpensSidebar] = useState(false);


const opensidebarfun=()=>{
  if(openSidebar==false){
  setOpensSidebar(true)
  }
  if(openSidebar==true){
    setOpensSidebar(false)
    
  }

}








  return (
        <div className='bg-lightGreen px-8 lg:px-14 py-8'>
        <div className='grid items-center grid-cols-[0.2fr_2fr_0.3fr] gap-3'>
        <div className="flex gap-2 " onClick={opensidebarfun}>
        {/* <span className="text-[18px] text-darkGreen font-Poppins">Menu</span> */}
        <HiMenuAlt1  className="text-[25px] cursor-pointer"/>
        </div>
        {/* <RiMenuUnfoldFill className="text-[25px]"/> */}
        <p className=' text-darkGreen text-[20px] lg:text-[24px] font-Elephant '>Admin Arsaleria Dot</p>
        {/* profile section is start from here */}
        <div className='grid grid-cols-[2.8fr_0.6fr]'>
          <span></span>

          <div className='rounded-full h-[50px] min-w-[50px] flex items-center justify-center bg-darkGreen'>
            <p className='text-[22px] text-lightGreen font-Poppins'>{adminProfileData[0]?.name?.charAt(0).toUpperCase()}</p>

          </div>
          {/* <img /> */}


        </div>
        {/* profile section is end here */}

        </div>

        <AdminSidebar openSidebar={openSidebar} setOpensSidebar={setOpensSidebar}  />
        </div>
  )
}

export default AdminHeader
