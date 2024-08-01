import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {

    const {total} = useSelector((state) => state.cart)

    const handleBuyCourse = () => {
        
    }

  return (
    <div className='flex flex-col gap-y-3 bg-richblack-800 px-3 py-5 rounded-lg border-[0.5px] border-richblack-600 
    w-[70%] md:w-[20%]'>
        <p className='text-richblack-300'>Total:</p>
        <p className='text-3xl text-yellow-25'>Rs. {total}</p>
        <button className='text-center text-[15px] px-6 py-3 rounded-md font-bold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                bg-yellow-50 text-black hover:scale-95 transition-all duration-200'
                onClick={handleBuyCourse}>
            Buy Now
        </button>
    </div>
  )
}

export default RenderTotalAmount