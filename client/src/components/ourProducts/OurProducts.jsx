import React from 'react'
import TrendingProductsButtons from '../trendingProductsButtons/TrendingProductsButtons'
import OurProductSectionSeeAllButton from '../ourProductSectionSeeAllButton/OurProductSectionSeeAllButton'
import Link from 'next/link'

const OurProducts = () => {
  
  return (
    <div>
     <p className="font-Roboto text-[40px] md:text-[50px] text-darkGreen text-center">Our products</p>
     {/* Trendig Products Button section is start from here */}
     <TrendingProductsButtons/>
     {/* Trendig Products Button section is end here */}

    <div className="mt-[20px] md:mt-[50px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[60px] md:gap-[20px] lg:gap-[40px]">
    {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
     <div className=" bg-whiteGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/6.webp" className="w-full h-full object-center lg:object-contain" />
     </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

     {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className="bg-whiteDarkGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/12.jpg" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

    {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className=" bg-grayGreen h-[300px] rounded-sm" >
      <img src="./homepageImgs/4.webp" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

    {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className="bg-whiteDarkGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/8.webp" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}


  



     {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className=" bg-whiteGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/9.webp" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}
       {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className="bg-whiteDarkGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/14.jpg" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

    {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className=" bg-grayGreen h-[300px] rounded-sm" >
      <img src="./homepageImgs/10.webp" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

    {/* card */}
    {/* loop is apply this div */}
    <Link href={`/productDetail/${2}`} className='cursor-pointer border border-gray-200 rounded-sm'>
    <div className="bg-whiteDarkGray h-[300px] rounded-sm" >
      <img src="./homepageImgs/11.webp" className="w-full h-full object-center lg:object-contain" />
    </div>
      {/* card text Content */}
      <div className="mt-[10px]">
        <p className="font-Poppins text-[22px] text-center text-darkGray bolder font-bold">product name</p>
        <div className="grid grid-cols-3">
          <p className="font-Poppins text-[18px] text-textLightGray text-end">$38.9</p>
          <p className="flex justify-center items-center">|</p>
          <p className="font-Poppins text-[18px] text-textLightGray ">5.0</p>

        </div>
      </div>
      </Link>
      {/* card text Content */}
    {/* loop is apply this div */}
    {/* {card} */}

    </div>
    <OurProductSectionSeeAllButton/>
    </div>
  )
}

export default OurProducts