import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getIntructorDashboardData } from '../../../../services/operations/profileAPI';
import { fetchIntructorCourses } from '../../../../services/operations/courseDetailsAPI';
import Spinner from '../../../common/Spinner/Spinner';
import InstructorChart from './InstructorChart';
import { Link, useNavigate } from 'react-router-dom';

const Instructor = () => {

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([])
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    console.log("Instructor data", instructorData);

    const getCourseDataWithStats = async() => {
        setLoading(true);

        const result = await getIntructorDashboardData(token);
        const instructorCourses = await fetchIntructorCourses(token);

        if(result.length){
            setInstructorData(result);
        }
        if(instructorCourses){
            setCourses(instructorCourses);
        }

        setLoading(false)
    }

    useEffect(() => {
        getCourseDataWithStats()
    },[])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr?.totalAmountGenerated ,0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr?.totalStudentsEnrolled, 0)

  return (
    <div className='text-white w-full mx-auto'>
        <h1 className='text-3xl font-semibold mb-2'>Hi, {user?.firstName} 👋</h1>
        <p className='text-lg text-richblack-300 mb-2'>Let's start something new</p>
        {
            loading? (<div className='absolute top-[45vh] left-[50vw]'><Spinner/></div>) : 
                courses.length>0? (
                    <div className='flex flex-col w-full gap-4'>
                        <div className='flex gap-4 max-sm:flex-col max-sm:items-center'>
                            <InstructorChart courses={instructorData}/>
                            <div className='bg-richblack-800 px-3 py-5 md:py-36 rounded-lg max-sm:text-center w-full mx-auto md:w-[30%]
                             flex flex-col gap-3 max-sm:items-center'>
                                <p className='text-xl font-semibold mx-auto'>Statistics</p>
                                <div className='flex flex-col items-center'>
                                    <p className='text-richblack-300'>Total Courses</p>
                                    <p className='text-richblack-50 text-2xl'>{courses?.length}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-richblack-300'>Total Students</p>
                                    <p className='text-richblack-50 text-2xl'>{totalStudents}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-richblack-300'>Total Income</p>
                                    <p className='text-richblack-50 text-2xl'>₹{totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full bg-richblack-800 px-3 py-5 rounded-lg flex flex-col gap-4'>
                            <div className='w-full flex items-center justify-between px-5'>
                                <p className='text-xl font-semibold'>Your Courses</p>
                                <button className='text-yellow-50'
                                onClick={() => navigate("/dashboard/my-courses")}>
                                    View All
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                {
                                    courses?.slice(0,3).map((course) => (
                                        <div className='flex flex-col gap-1 w-[32%] bg-richblack-700 p-3 rounded-lg'>
                                            <img src={course?.thumbnail} alt="" className='w-]'/>
                                            <div className='flex flex-col max-sm:items-center'>
                                                <p>{course.courseName}</p>
                                                <p className='text-richblack-300'>{course?.studentsEnrolled?.length} students | ₹{course?.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ):
                (<><p className='text-2xl'>No courses created yet</p>
                    <Link to={"/dashboard/add-course"} className='text-4xl text-yellow-50'>Create a course</Link></>)
        }
    </div>
  )
}

export default Instructor