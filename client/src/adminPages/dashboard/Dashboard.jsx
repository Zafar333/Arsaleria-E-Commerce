"use client";
import AdminHeader from "@/adminComponents/adminHeader/AdminHeader";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import { DevelopmentBaseUrl } from "@/utils/api/main";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Dashboard() {
  const router=useRouter()
  const [adminProfileData,setAdminProfileData]=useState([])
  const [pageLoader,setPageLoader]=useState(false)
  const searchParams = useSearchParams();

   useEffect(() => {
    getAdminLoginDetailApiFun()
  }, [])

  


  // getAdminLoginDetailApiFun is start from here
  const getAdminLoginDetailApiFun = async () => {

    try {
      setPageLoader(true)
      const data = Object?.fromEntries(searchParams?.entries())
      if (!data) {
        return toast.error(" server error")

      }
      // console.log("queryparams", data)
      const res = await fetch(`${DevelopmentBaseUrl}${adminEndpoints?.adminProfile}?id=${data?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await res?.json()
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoader(false)
        setAdminProfileData(result?.data)

        // toast.success(result?.message)
      }
      if (result?.status == 401 ) {
         router.replace("/adminLogin")
        toast.error(result?.message)
      }
      if (result?.status >= 402 && result?.status <= 550|| result?.status==400) {
        toast.error(result?.message)
      }
    } catch (error) {
      // console.log("error", error?.message)
      toast.error("catch server error")

    }



  }
  // getAdminLoginDetailApiFun is end here

  return (
    <div className="">
      <AdminHeader adminProfileData={adminProfileData}/>

    </div>
  );
}

export default Dashboard;
