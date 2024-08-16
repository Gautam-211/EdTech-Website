import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';

const RenderTotalAmount = () => {

    const {total,cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch)
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