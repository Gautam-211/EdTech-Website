import React, { useEffect, useState } from 'react'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Spinner from '../../common/Spinner/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
import { addToCart } from '../../../slices/cartSlice';

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);

        } catch (error) {
            toast.error("Unable to fetch enrolled courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    },[])

  return (
    <div className='text-white relative'>
        <h1 className='text-4xl mb-[1rem]'>Enrolled Courses</h1>
        {
            !enrolledCourses?(
                <div className='absolute top-[35vh] left-[25vw]'>
                    <Spinner/>
                </div>
            ): !enrolledCourses.length? (<p>You have not enrolled in any course yet</p>):
            (
                <div className='flex flex-col rounded-2xl border-[1px] border-richblack-600'>
                    <div className='flex bg-richblack-600 text-richblack-25 px-3 py-5 rounded-t-2xl justify-between'>
                        <p className='w-[50%]'>Course Name</p>
                        <p className='w-[20%]'>Duration</p>
                        <p className='w-[30%]'>Progress</p>
                    </div>

                    {
                        enrolledCourses.map((course) => (
                            <div key={course._id} className='py-4 px-3 flex border-t-[1px] border-richblack-600 items-center'>
                                <div className='flex items-center gap-x-4 w-[50%]'>
                                    <img src={course.thumbnail} alt="" className='w-[3.5rem] aspect-square rounded-xl'/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription.slice(0,30) + "..." }</p>
                                    </div>
                                </div>

                                <div className='w-[20%]'>
                                    {course?.totalDuration}
                                </div>

                                <div className='w-[30%] flex flex-col gap-y-1'>
                                    <p>Progress: 60</p>
                                    <ProgressBar
                                        completed={50}
                                        height='8px'
                                        width='80%'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>         
            )
        }

    </div>
  )
}

export default EnrolledCourses