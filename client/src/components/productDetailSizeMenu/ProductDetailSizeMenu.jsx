"use client"
import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const ProductDetailSizeMenu = () => {
    // selected size fun is sstart from here
    const selectedSizeFun=(size)=>{
        console.log("size is",size)

    }
    // selected size fun is end here
    const items = [
        { 
          label: <a onClick={()=>selectedSizeFun("small")}>small</a>,
          key: '0',
        },
        {
          label: <a onClick={()=>selectedSizeFun("medium")}>medium</a>,
          key: '1',
        },
        {
            label: <a onClick={()=>selectedSizeFun("large")}>large</a>,
            key: '2',
          },
          {
            label: <a onClick={()=>selectedSizeFun("x-large")}>x-large</a>,
            key: '3',
          },
        {
          type: 'divider',
        },
       
      ];
  return (
    <div className='flex gap-[20px] items-center'>
        <p className='text-darkGreen font-Poppins text-[20px]'>Size:</p>
        <Dropdown className='border border-darkGreen p-[5px]'
    menu={{
      items,
    }}
    trigger={['click']}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space className='text-[14px] '>
        Select Size
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    </div>
  )
}

export default ProductDetailSizeMenu