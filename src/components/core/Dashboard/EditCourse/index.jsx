import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

const EditCourse = () => {

    const dispatch = useDispatch()
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const populateCourseDetails = async() => {
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId,token);
        if(result?.courseDetails){
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails));
        }
        setLoading(false);
    }

    useEffect(() => {
        populateCourseDetails();
    },[])

    if(loading){
        return <p className='text-yellow-50 mt-[4rem] md:ml-[5rem] text-2xl'>Loading...</p>
    }

  return (
    <div className='text-white flex flex-col-reverse md:flex-row items-center md:items-start gap-x-4 gap-y-6'>
        <div className='flex flex-col items-center md:items-start w-full md:w-[60%] mx-auto'>
            <h1 className='text-4xl mb-[3rem]'>Edit Course</h1>
            {
                <RenderSteps/> 
            }
            
        </div>    
    </div>
  )
}

export default EditCourse