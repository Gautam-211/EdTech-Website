import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart);

  return (
    <div className='text-white'>
        <h1 className='text-4xl mb-[3rem]'>Your Cart</h1>
        <p className='text-base text-richblack-300 border-b-[1px] border-richblack-500 pb-3 mb-3'>{totalItems} courses in Cart</p>

        {
            total>0 ? (
            <div className='flex flex-col-reverse md:flex-row items-center md:items-start gap-4'>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>
            ) : 
            (
                <p className='text-xl text-richblack-300'>Your Cart is empty</p>
            )
        }
    </div>
  )
}

export default Cart