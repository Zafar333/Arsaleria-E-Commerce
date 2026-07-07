"use client"
import React from 'react'
import { Input} from 'antd';
const { Search } = Input;
import "./allProductsSearchBar.css"

const AllProductsSearchBar = () => {
    // searchBar function is startfrom here
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  // searchBar function is end here
    return (
        <div className='mt-[50px] mb-[50px] text-right'>
            <Search  size='large' className='w-full sm:w-[400px] lg:w-[600px] rounded-sm custom-border text-[30px] font-Poppins custom-placeholder ' placeholder="Search product" onSearch={onSearch} enterButton />
        </div>
    )
}

export default AllProductsSearchBar