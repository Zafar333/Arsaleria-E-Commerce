"use client"
import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import "./adminsidebar.css"
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"
import { DevelopmentBaseUrl, frontendDevelopmentBaseUrl } from '@/utils/api/main';
import { toast } from 'react-toastify';
import { adminEndpoints } from '@/utils/api/admin/adminEndpoints';
 const AdminSidebar = ({openSidebar,setOpensSidebar}) => {
//  const [sidebarstate,setsidebarstate]=useState(["addcategories","addproducts","products","home","login"])
 const [sidebarstate,setsidebarstate]=useState("addcategories")
 const [queryparams,setquerparams]=useState("addcategories")
 const [btnLoader,setBtnLoader]=useState(false)
 const router =useRouter();
 const searchquerparams=useSearchParams();
 const pathname = usePathname();
//  useEffect(()=>{
//   console.log("urlpath",pathname)
//   console.log("urlpath window",window.location.href)

//  },[pathname])
 
 useEffect(()=>{
  // console.log("quer",querparams)
 const query = Object.fromEntries(searchquerparams?.entries());
 if(query){
  setquerparams(query)
 }

 },[searchquerparams])

//  adminlogout fun is start from here
 const adminlogoutfunapi=async()=>{
  
    try{
      setBtnLoader(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminLogout}?adminLogout=logout&id=${queryparams?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setBtnLoader(false);
        toast.success(result?.message)
        return router.replace(`${frontendDevelopmentBaseUrl}/`)
      }
      
      if (
        result?.status >= 400 && result?.status <= 550  ) {
        
            setBtnLoader(false);
        return toast.error(result?.message);
      }
    } catch (error) {
      setBtnLoader(false);
      // console.log(error?.message)
      return toast.error("server error");
    }

 }
//  adminlogout fun is end here
 
 
 const gotoAddCategoriesFun=(val)=>{
    console.log("color",val)
    setsidebarstate(val)
      if(val=="addcategories"){
      router?.replace(`${frontendDevelopmentBaseUrl}/admin?id=${queryparams?.id}`)
    }
    if(val=="addproducts"){
      router?.replace(`${frontendDevelopmentBaseUrl}/admin/addProducts?id=${queryparams?.id}`)
    }
     if(val=="products"){
      router?.replace(`${frontendDevelopmentBaseUrl}/admin/allProducts?id=${queryparams?.id}`)
    }
    if(val=="home"){
      router?.replace(`${frontendDevelopmentBaseUrl}/`)
    }
     if(val=="logout"){
     return adminlogoutfunapi()
    }
    if(val=="orders"){
      router?.replace(`${frontendDevelopmentBaseUrl}/admin/orders?id=${queryparams?.id}`)
    }
 }


  const onClose = () => {
    setOpensSidebar(false);
  };
  return (
    <div className=''>
      
      <Drawer
        title="Sidebar Menu"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={openSidebar}
        placement='left'
          styles={{
    body: {
      background: "#224F34",
      color: "",
    },
    header: {
      background: "#fff",
      color: "#224F34",
    },
  }}
        className={`custom-drawer p-0 m-0 `}
        
        
    
      >
    <div className='flex flex-col gap-6 lg:gap-10 w-full '>
        <span className={`${sidebarstate=="addcategories"?("bg-lightGreen text-darkGreen "):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px] font-Poppins hover:text-darkGreen  hover:bg-lightGreen cursor-pointer`} onClick={()=>gotoAddCategoriesFun("addcategories")}>Add Categories </span>
        <span className={`${sidebarstate=="addproducts"?("bg-lightGreen text-darkGreen "):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px]  font-Poppins hover:text-darkGreen hover:bg-lightGreen cursor-pointer`} onClick={()=>gotoAddCategoriesFun("addproducts")}>Add Product </span>
        <span className={`${sidebarstate=="products"?("bg-lightGreen text-darkGreen "):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px]  font-Poppins hover:text-darkGreen hover:bg-lightGreen cursor-pointer `} onClick={()=>gotoAddCategoriesFun("products")}>All Products </span>
        <span className={`${sidebarstate=="orders"?("bg-lightGreen text-darkGreen "):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px]  font-Poppins hover:text-darkGreen hover:bg-lightGreen cursor-pointer`} onClick={()=>gotoAddCategoriesFun("orders")}>Orders </span>
        <span className={`${sidebarstate=="home"?("bg-lightGreen text-darkGreen "):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px]  font-Poppins hover:text-darkGreen hover:bg-lightGreen cursor-pointer`} onClick={()=>gotoAddCategoriesFun("home")}>Home </span>
       {btnLoader==false?(
        <span className={`${sidebarstate=="logout"?("bg-lightGreen text-darkGreen"):("text-lightGreen")} px-5 py-1 text-[14px] md:text-[17px] font-Poppins hover:text-darkGreen hover:bg-lightGreen cursor-pointer`} onClick={()=>gotoAddCategoriesFun("logout")}>Logout </span>
        ):("loading...")}
        </div>
      </Drawer>
    </div>
  )
}

export default AdminSidebar