import { DevelopmentBaseUrl } from '@/utils/api/main'
import { userEndPoints } from '@/utils/api/user'
import CartPage from '@/websitePages/cartPage/CartPage'
import React from 'react'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";







const page = async() => {

        const cookieStore =await cookies();
      
        // console.log("userAccessToken",cookieStore.get("userAccessToken")?.value)
        // console.log("userRefreshtoken",cookieStore.get("userRefreshtoken")?.value)
        const userAccessToken=  cookieStore.get("userAccessToken")?.value
        const userRefreshtoken= cookieStore.get("userRefreshtoken")?.value

        if(!userAccessToken){
          redirect("/userLogin")
        }
    return (
    <>
    
    <div  className='bg-[#f4f6f8] px-[10px] sm:px-[20px]'><CartPage/></div>
  
    </>
  )






// call api fun is start from here send cookies token

  // const callapi=async()=>{
  
  // try{
  //       const cookieStore = cookies();
      
  //       // console.log("token",cookieStore)
  //   const response =  await fetch(
  //     `${DevelopmentBaseUrl}${userEndPoints.userCheckToken}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Cookie: cookieStore.toString(),
  //       },
  //       cache: "no-store",
  //     }
  //   );

  //   console.log("status", response.status);

  //   const data = await response.json();

  //     }catch(error){
  //       console.log("ha g err",error.message)
  //     }
         
  //   }
  //   callapi();
  
// call api fun is end here send cookies token




  
 
}

export default page