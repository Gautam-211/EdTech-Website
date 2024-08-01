import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { FaRegStar, FaStar } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.cart);

  return (
    <div className='flex flex-col w-[100%] md:w-[80%] '>
        {
            cart.map((course) => (
                <div className='flex py-6 border-b-[1px] border-richblack-600 pr-4 justify-between gap-x-2'>
                    <div className='flex gap-x-4'>
                    <img src={course.thumbnail} alt="" className='w-[6rem] md:w-[8rem] rounded-lg aspect-square'/>

                    <div className='flex flex-col h-full justify-start gap-y-1 text-sm'>
                        <h1 className='md:text-lg'>{course?.courseName}</h1>
                        <p className='text-richblack-300'>{course?.category?.name}</p>
                        <div className='flex items-center gap-x-2 text-yellow-25'>
                            <span>4.5</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor={"#ffd700"}
                                emptyIcon={<FaRegStar />}
                                fullIcon={<FaStar />}/>
                            <span className='text-richblack-300 text-base'>{"("+course?.ratingAndReviews?.length+")"}</span>
                        </div>
                    </div>
                    </div>

                    <div className='flex flex-col items-center gap-y-4'>
                        <button className='flex items-center gap-x-1 md:gap-x-2 text-pink-200 bg-richblack-800 px-2 md:px-3 py-2 md:py-3
                        rounded-lg border-[1px] border-richblack-600 hover:scale-95 duration-200 transition-all ease-linear'
                        onClick={() => dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line/>
                            Remove
                        </button>
                        <p className='text-xl md:text-2xl text-yellow-25'>Rs. {course?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses