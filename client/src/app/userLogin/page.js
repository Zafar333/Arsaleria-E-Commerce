import UserLoginPageComponent from '@/components/userLoginPageComponent/UserLoginPageComponent'
import React from 'react'
import { cookies } from "next/headers";
import { redirect } from "next/navigation"


const page = async() => {
    const cookieStore = await cookies();
    // console.log("again userlogin page")

  const userAccessToken = cookieStore.get("userAccessToken");
  const userRefreshtoken = cookieStore.get("userRefreshtoken");
  return (
    <div>
      {userAccessToken&&userRefreshtoken?(redirect("/")):(
          <UserLoginPageComponent/>

      )}
  
    </div>
  )
}

export default page