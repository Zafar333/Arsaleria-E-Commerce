import React from 'react'
import { Carousel } from 'antd';
import "./allProductsCrousel.css"


const AllProductsCrousel = () => {
  return (
    <Carousel arrows autoplay className='allProductsCrousel'>
    <div>
        <img  className='w-full  object-cover allProductsCrousel ' src="./cover4.webp" alt=""  />
    </div>
    <div>
        <img className='w-full object-cover allProductsCrousel ' src="./cover5.webp" alt=""  />
    </div>
    <div>
        <img className='w-full  object-cover allProductsCrousel' src="./cover6.webp" alt=""  />
    </div>
    </Carousel>
  )
}

export default AllProductsCrousel