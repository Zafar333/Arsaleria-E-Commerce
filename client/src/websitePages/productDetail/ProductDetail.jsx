import React from 'react'
import ProductDetailPageImgAndImgSlider from '@/components/productDetailImgAndImgSlider/ProductDetailPageImgAndImgSlider';
import ProductDetailPrice from '@/components/productDetailPrice/ProductDetailPrice';
import ProductDetailSizeMenu from '@/components/productDetailSizeMenu/ProductDetailSizeMenu';
import AllProductsCardImg from '@/components/allProductsCardImg/AllProductsCardImg';
import ProductDetailAddToCartButton from './productDetailPageButtons/ProductDetailAddToCartButton';
import ProductDetailBuyNowButton from './productDetailPageButtons/ProductDetailBuyNowButton';


const ProductDetail = () => {
 
    return (
        <div className='mt-[100px] max-w-[1400px] m-auto'>
            {/* productDetail section is sstart from here */}
            <div className='flex flex-col xl:flex-row gap-[20px] xl:gap-[100px] border border-red-600 '>
                {/* product Card is start from here */}
                <div className='flex flex-col gap-[10px] max-w-[750px] xl:min-w-[550px] h-fit rounded-sm '>
                        <div>
                            <p className='font-Poppins text-[22px] text-darkGreen'>Plain White Shirt </p>
                        </div>
                        {/* img card componenet is start from here */}
                        <ProductDetailPageImgAndImgSlider/>
                        {/* img card componenet is end here */}

                  
                </div>
                {/* product Card is end here */}

             {/* productDescriptionDetail section is start from here */}
             <div className='flex flex-col py-0 xl:py-[36px] px-[10px]  gap-[30px] '>

             <ProductDetailPrice/>
             

               <div className='flex'>
                <p className='text-darkGreen text-[24px]'>Status :</p>
                <p className='text-lightGreen text-[24px]'>In Stock</p>
                </div>
                <ProductDetailSizeMenu/>


               <div className=''>
                <p className='text-darkGreen text-[24px]'>Description</p>
                <p className='px-[5px] text-textLightGray text-[12px] xs:text-[16px] font-light'>Automatic Transmission Driver Airbags Coupe Gasoline Warranty Does Not Apply Red V8 1 Key Other Documents
                </p>
                </div>
                <ProductDetailBuyNowButton/>
                <ProductDetailAddToCartButton/>

               
             </div>
             {/* productDescriptionDetail section is end here */}


            </div>

            {/* similar products section is start from here */}
            {/* <div className='mt-[100px]  '>
                <p className='text-[24px] text-darkGreen mb-[30px]'>Similar Products</p>
                <div className='grid grid-cols-4 gap-[20px]'>
                    <AllProductsCardImg/>
                </div>
            </div> */}
            {/* similar products section is start from here */}

        </div>
    )
}

export default ProductDetail