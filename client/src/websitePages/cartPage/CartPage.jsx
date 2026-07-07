import StripeProvider from '@/components/checkoutComponents/StripeProvider'
import React from 'react'

const CartPage = () => {
  return (
    <div className='mt-[100px] max-w-[1400px] m-auto'>
       <div> <StripeProvider/></div>
        </div>
  )
}

export default CartPage