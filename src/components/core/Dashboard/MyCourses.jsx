import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchIntructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { AiOutlinePlus } from 'react-icons/ai';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    const fetchCourses = async() => {
        const result = await fetchIntructorCourses(token);
        if(result){
            setCourses(result)
        }
    }

    useEffect(() => {
        fetchCourses();

    },[])

  return (
    <div className='text-white'>
        <div className='flex items-center justify-between pb-[1rem] border-b-[1px] border-richblack-600'>
            <h1 className='text-4xl'>My Courses</h1>
            <IconBtn text={"Add Course"} onclick={() => navigate("/dashboard/add-course")}
                customClasses={"flex items-center gap-1"}>
                <AiOutlinePlus/>
            </IconBtn>
        </div>

        <div>
            
             <CourseTable courses={courses} setCourses={setCourses}/>
 
        </div>

    </div>
  )
}

export default MyCourses