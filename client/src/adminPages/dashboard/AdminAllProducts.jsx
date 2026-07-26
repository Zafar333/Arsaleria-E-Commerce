"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DevelopmentBaseUrl,
  frontendDevelopmentBaseUrl,
} from "@/utils/api/main";
import { Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { adminEndpoints } from "@/utils/api/admin/adminEndpoints";
import { toast } from "react-toastify";

const AdminAllProducts = () => {
  const router=useRouter()
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const [pageLoading, setPageLoading] = useState(false);
  const [adminAllProducts, setAdminAllProducts] = useState([]);



  useEffect(()=>{
    console.log("adminallproducts",adminAllProducts)

  },[adminAllProducts])
  
  
  
  useEffect(()=>{
     adminGetAllProductsFunApi ()  

  },[])

  // for route changes useffect calling the fun mange page loading start here
  useEffect(() => {
    browserUrlChangePageloadingfun();
  }, [pathname]);
  // for route changes useffect calling the fun mange page end here

  // browserUrlChangePageloadingfun is start from here
  const browserUrlChangePageloadingfun = () => {
    // console.log("pageloadinfun call",pathname)
    // console.log("pageloadinfun call",frontendDevelopmentBaseUrl)
    const queryparam = searchparams.getAll("id");
    // console.log("pageloadinfun call",queryparam[0])

    if (
      `${frontendDevelopmentBaseUrl}/admin/allProducts?id=${queryparam[0]}` ==
      `${frontendDevelopmentBaseUrl}${pathname}?id=${queryparam[0]}`
    ) {
      console.log("inblock");
      setPageLoading(false);
    } else {
      console.log("else");
      setPageLoading(true);
    }
  };
  // browserUrlChangePageloadingfun is end here

  // adminGetAllProductsFunApi fun is start from here
  const adminGetAllProductsFunApi = async () => {
    // adminGetAllProducts

    try {
      setPageLoading(true);
      const response = await fetch(
        `${DevelopmentBaseUrl}${adminEndpoints?.adminGetAllProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result?.status >= 200 && result?.status < 400) {
        setPageLoading(false);
        setAdminAllProducts(result?.data)
       return toast.success(result?.message);
      }
      if (result?.status == 401) {
        setPageLoading(true);
        router.replace("/adminLogin");
        return toast.error(result?.message);
      }
      if (
        (result?.status >= 402 && result?.status <= 550) ||
        result?.status == 400
      ) {
        setPageLoading(true);
        return toast.error(result?.message);
      }
    } catch (error) {
      setPageLoading(true);
      // console.log(error?.message)
      return toast.error("server error");
    }
  };

  // adminGetAllProductsFunApi fun is end here
  return (
    <div className="mx-[15px] xs:mx-[80px]  sm:mx-[20px]">
      {pageLoading == false ? (
        <div className="max-w-[1400px] mx-auto">
          {/* //////// */}
          <div className="mt-[80px] md:mt-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[60px] md:gap-[20px] lg:gap-[40px]">
            {/* card */}
            {/* loop is apply this div */}
            {adminAllProducts?.map((prod,ind)=>(
            <Link key={ind}
              href={""}
              className="cursor-pointer border border-gray-200 rounded-sm"
            >
              <div className=" bg-whiteGray h-[300px] rounded-sm">

                <Image
                  alt="Image"
                  width={310}
                  height={200}
                  src={prod?.media[0]?.secure_url}
                  className="w-full h-full object-contain "
                />
              </div>
              {/* card text Content */}
              <div className="mt-[10px]">
                <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">
                  product name
                </p>
                <div className="grid grid-cols-3 items-center justify-center">
                  <p className="font-Poppins text-[18px] text-textLightGray text-end">
                    $38.9
                  </p>
                  <p className="flex justify-center items-center">|</p>
                  <p className="  ">
                    <MdDeleteOutline className="text-red-600! text-[20px]! cursor-pointer " />
                  </p>
                </div>
              </div>
            </Link>
            ))}
            {/* card text Content */}
            {/* loop is apply this div */}
            {/* {card} */}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AdminAllProducts;
