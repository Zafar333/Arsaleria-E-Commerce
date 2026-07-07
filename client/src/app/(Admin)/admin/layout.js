import React from 'react'
import { toast } from 'react-toastify';
import { cookies } from 'next/headers';
import Dashboard from '@/adminPages/dashboard/Dashboard';
import { redirect } from "next/navigation";


const layout = async({children}) => {

  const cookieStore=await cookies()
  const adminaccestoken=cookieStore.get("AdminAccessToken")
  const adminrefreshtoken=cookieStore.get("AdminRefreshToken")


  
  return (
    <>
    {adminaccestoken&&adminrefreshtoken?(
     <div className=''>
      <Dashboard/>
     {children}
    
    </div>

    ):(redirect("/adminLogin"))}
    
    </>

  )
}

export default layout