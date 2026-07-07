import React from 'react'
import BuyNowButton from './BuyNowButton'

const ExclusiveOfferSection = () => {   
  return (
    <div className='w-full mt-[100px]'>
        <div className='px-2 md:px-[50px] lg:px-[100px] flex items-end gap-[50px] lg:gap-[100px] bg-lightGreen'>
            <div className='lg:block hidden'>
                <img className=' w-[500px] h-[400px] object-cover' src="./exclusive-offerImg.svg" alt=""  />
            </div>
            <div className='py-[40px] flex flex-col gap-[20px] '>
          
                <p className='text-[35px] md:text-[46px] font-Roboto text-darkGreen'>Exclusive offer</p>
              
                <p className='text-[18px] md:text-[22px] font-Poppins text-darkGreen'>Unlock the ultimate style upgrade with our exclusive offer Enjoy savings of up to 40% off on our latest New Arrivals</p>
                <div className='lg:hidden block border border-red-600'>
                <img className='border border-black w-fit h-[400px] object-cover' src="./exclusive-offerImg.svg" alt="" />
               </div>
                {/* time duration days section  */}
                <div className='flex gap-[30px]'>
                    {/* days is start from here*/}
                    <div className="w-[70px] h-[70px] xs:w-[80px] xs:h-[80px] lg:w-[100px] lg:h-[100px] bg-white flex flex-col items-center justify-center font-Poppins text-[24px] lg:text-[32px] text-darkGreen">06
                        <p className='text-[16px] font-bold'>Days</p>
                    </div>
                    {/* days is end here*/}
                    
                    
                    {/* housr is start from here */}
                    <div className="w-[70px] h-[70px] xs:w-[80px] xs:h-[80px] lg:w-[100px] lg:h-[100px] bg-white flex flex-col items-center justify-center font-Poppins text-[24px] lg:text-[32px] text-darkGreen">18
                        <p className='text-[16px] font-bold'>Hours</p>
                    </div>
                    {/* housr is end here */}

                    {/* Min is start from here */}
                    <div className="w-[70px] h-[70px] xs:w-[80px] xs:h-[80px] lg:w-[100px] lg:h-[100px] bg-white flex flex-col items-center justify-center font-Poppins text-[24px] lg:text-[32px] text-darkGreen">48
                        <p className='text-[16px] font-bold'>Min</p>
                    </div>
                    {/* Min is end here */}

                </div>
                {/* time duration days section  */}
                <BuyNowButton/>



            </div>

        </div>
    </div>
  )
}

export default ExclusiveOfferSection