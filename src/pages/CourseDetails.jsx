import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI';

const CourseDetails = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const {courseId} = useParams();

    const handleBuyCourse = () => {
        if(!token){
            toast.error("Login first to buy a course")
            navigate("/login")
        }
        else{
            // buyCourse();
            return
        }
    }

  return (
    <div>
        <button className='bg-yellow-5 text-richblack-900 px-3 py-4 rounded-lg mt-16'
        onClick={() => handleBuyCourse()}>
            Buy Now {courseId}
        </button>
        
    </div>
  )
}

export default CourseDetails