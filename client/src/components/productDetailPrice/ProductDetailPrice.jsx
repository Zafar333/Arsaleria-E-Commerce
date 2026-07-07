"use client"
import React from 'react'
import {Typography } from 'antd';
const { Text } = Typography;



const ProductDetailPrice = () => {
  return (
    <div className='flex gap-[10px] items-center'>  
    <div className=''><Text className='text-lightGreen text-[18px] font-Poppins' delete type='danger'>2000</Text></div>
    <div className='text-darkGreen text-[24px] font-Poppins'>12000 Rs</div>
  </div> 
  )
}

export default ProductDetailPrice