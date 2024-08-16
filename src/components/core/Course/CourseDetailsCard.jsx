import React from 'react'
import { addToCart, removeFromCart } from '../../../slices/cartSlice';
import IconBtn from '../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const {thumbnail, price} = course;

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard")
    }
    const handleAddToCart = ( ) => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Instructor cannot buy a course!")
            return
        }
        if(token){
            dispatch(addToCart(course));
            return 
        }
        setConfirmationModal({
            text1:"Do you want to log in?",
            text2:"You are not logged in currently",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => {navigate("/dashboard/login")},
            btn2Handler:() => {setConfirmationModal(null)}
        })
    }

    const handleRemoveFromCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Instructor cannot buy a course!")
            return
        }
        if(token){
            dispatch(removeFromCart(course._id));
            return 
        }
        setConfirmationModal({
            text1:"Do you want to log in?",
            text2:"You are not logged in currently",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => {navigate("/login")},
            btn2Handler:() => {setConfirmationModal(null)}
        })
    }

  return (
    <div className='w-full m-2 overflow-hidden rounded-md flex flex-col gap-1 bg-richblack-700'>
        <img src={thumbnail} alt="" className='max-h-[300px] min-h-[180px]'/>
        <div className='w-full flex flex-col p-4 items-center'>
            <p className='text-3xl w-full text-start'>Rs.{price}</p>
            <div className='mt-[1rem] flex flex-col gap-2 w-full'>
                <button className='w-full rounded-lg bg-yellow-50 px-3 py-2 text-richblack-900
                hover:bg-yellow-200 transition-all duration-200 ease-linear'
                onClick={
                    user && course?.studentsEnrolled?.includes(user?._id)?
                    () => navigate("/dashboard/enrolled-courses") : handleBuyCourse 
                }>
                    {
                        user && course?.studentsEnrolled?.includes(user?._id)?"Go to Course" : "Buy Course"
                    }
                </button>

                {
                    !course?.studentsEnrolled?.includes(user?._id) &&
                    (
                        cart.some((item) => item._id === course._id) ? 
                        (
                            <button className='w-full rounded-lg bg-red bg-opacity-50 text-richblack-50 px-3 py-2
                            hover:opacity-70 transition-all duration-200 ease-linear'
                            onClick={handleRemoveFromCart}>
                                Remove from Cart
                            </button>
                        ) :
                        (
                            <button className='w-full rounded-lg bg-caribbeangreen-300 text-richblack-900 px-3 py-2
                            hover:bg-caribbeangreen-400 transition-all duration-200 ease-linear'
                            onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        )
                    )
                   
                }
            </div>
            <p className='text-richblack-300 mt-2'>30-Day Money-Back Guarantee</p>

            <div className='w-full flex flex-col gap-1 items-start mt-3'>
                <p>This course includes:</p>
                {
                    course?.instructions?.map((instruction, index) => (
                        <p key={index} className='text-caribbeangreen-200'>{instruction}</p>
                    ))
                }
            </div>
            
            <div className='w-full flex flex-col items-center mt-2'>
                <button className='px-3 py-2 rounded-lg text-lg text-yellow-25'
                onClick={handleShare}>
                    Share
                </button>
            </div>

        </div>
    </div>
  )
}

export default CourseDetailsCard