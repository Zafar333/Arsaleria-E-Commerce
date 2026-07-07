"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const TrendingProductsButtons = () => {
    const [activeColor,setActiveColor]=useState("allProducts")
    // getTrendingProductsDataFun is start from here
   const getTrendingProductsDataFun=(data)=>{
    console.log("getTrendingProductsDataFun",data)
    setActiveColor(data)

   }
    // getTrendingProductsDataFun is end here
  return (
    <div className='flex justify-center mt-[50px]'>
      <div className='py-[10px] md:py-0 flex gap-[40px] md:gap-[80px] overflow-x-auto'>
      <Link href={"#"} className={`${activeColor==="allProducts"?"border-b-2 border-darkGreen text-darkGreen":"text-textLightGray"} text-nowrap max-w-fit text-[18px] md:text-[22px] font-Poppins text-textLightGray`} onClick={()=>getTrendingProductsDataFun("allProducts")}>All Products</Link>
      <Link href={"#"} className={`${activeColor==="sale"?"border-b-2 border-darkGreen text-darkGreen":"text-textLightGray"} max-w-fit text-[18px] md:text-[22px] font-Poppins text-textLightGray`} onClick={()=>getTrendingProductsDataFun("sale")}>Sale</Link>
      <Link href={"#"} className={`${activeColor==="New Arrivals"?"border-b-2 border-darkGreen text-darkGreen":"text-textLightGray"} text-nowrap text-[18px] md:text-[22px] font-Poppins max-w-fit`} onClick={()=>getTrendingProductsDataFun("New Arrivals")}>New Arrivals</Link>
      <Link href={"#"} className={`${activeColor==="Accessories"?"border-b-2 border-darkGreen text-darkGreen":"text-textLightGray"}  max-w-fit text-[18px] md:text-[22px] font-Poppins `} onClick={()=>getTrendingProductsDataFun("Accessories")}>Accessories</Link>
      </div>
    </div> 
  )
}

export default TrendingProductsButtons