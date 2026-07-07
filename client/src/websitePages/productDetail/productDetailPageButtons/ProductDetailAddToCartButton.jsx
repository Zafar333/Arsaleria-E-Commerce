"use client"
import { setAddToCartModalDispatch } from '@/store/cartDetailSlice'
import { Button} from 'antd'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'




const ProductDetailAddToCartButton = () => {
  const dispatch=useDispatch()
  const navigate=useRouter()
  const cartData=useSelector((state)=>state.cartDetailSlice.cartdetail)
  const AddToCartModalState=useSelector((state)=>state.cartDetailSlice.AddToCartModal)
 



  // OpenAddToCartModal is startf from here
  const OpenAddToCartModal=()=>{
    // navigate.push(`/cart/${2}`)
    dispatch(setAddToCartModalDispatch(true))


  }
  // OpenAddToCartModal is end here



  return (
     <div className=''>
     {/* Add to cart Button is start from here */}
    <Button className='!bg-lightGreen border !border-lightGreen !text-darkGreen !text-[18px] sm:!text-[20px] !font-Poppins !py-[20px] !px-[20px] sm:!px-[30px] w-[250px] xl:min-w-full' onClick={OpenAddToCartModal}>Add to Cart</Button>
     {/* Add to cart Button is end here */}
     
</div>
  )
}

export default ProductDetailAddToCartButton