"use client"
import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip,Input } from 'antd';

const AllProductsFilter = () => {
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
      };
      const items = [
        {
          label:
           <div className=''>
           <div className='text-center mb-[20px]  '>
             <p className='text-[20px]'>Price</p>
            </div>
            <div className='flex gap-3 mb-[20px]'>
             <div>  
            <p className='text-[18px]'>From</p>
            <Input  placeholder='0'/>
            </div> 
            <div>  
            <p className='text-[18px]'>To</p>
            <Input  placeholder='Any'/>
            </div> 
            </div>
            <div className='flex justify-around'>
                <Button className='bg-lightGreen text-darkGreen text-[18px] py-[20px]'>Cancel</Button>
                <Button className='bg-darkGreen text-white text-[18px] py-[20px]'>Apply Filter</Button>
             </div>
          
          </div>,
          key: '1',
        //   icon: <UserOutlined />,
        },
     
      ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
      };
  return (
    <Dropdown menu={menuProps} >
    <Button className='text-[16px] text-darkGreen py-[20px] font-Poppins w-fit'>
      <Space>
        Price Filter
        <DownOutlined />
      </Space>
    </Button>
  </Dropdown>
  )
}

export default AllProductsFilter