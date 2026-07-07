"use client"
import React from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
const OurProductSectionSeeAllButton = () => {
  const navigate=useRouter()
  const seeAllFun=()=>{
    navigate.push("/allProducts")
  }
  return (
    <div className='flex justify-center mt-[80px]'><Button className='!py-[24px] !px-[60px] !rounded-sm border !border-darkGreen !text-[22px] !font-Poppins' onClick={seeAllFun}>See All</Button></div>
  )
}

export default OurProductSectionSeeAllButton