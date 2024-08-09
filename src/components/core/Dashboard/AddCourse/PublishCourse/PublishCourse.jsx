import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true)
        }
    },[])

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses") 
    }

    const handleCoursePublish = async() => {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goToCourses();
            return
        }

        //if form is updated
        const formData = new FormData();
        formData.append("courseId", course._id);

        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }

        setLoading(false);
    }
    
    const onSubmit = async() => {
        handleCoursePublish()
    }

  return (
    <div className='text-white mt-10 md:mr-12 flex flex-col items-start w-full bg-richblack-800 px-5 py-7 
    rounded-lg gap-y-4'>
        <p className='text-2xl font-semibold'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4 items-start'>
            <div className='flex items-center gap-2 flex-row-reverse'>
                <label htmlFor="public" className='text-richblack-200'>Make this course as public</label>
                <input 
                    type="checkbox"
                    id='public' 
                    {...register("public")}
                    className='rounded h-4 w-4'
                />
            </div>

            <div className='flex items-center justify-end w-full gap-3'>
                <button onClick={goBack}
                    className='px-3 py-2 rounded-lg bg-richblack-600 hover:bg-opacity-80 transition-all duration-200 
                    ease-linear flex items-center '>
                    <MdKeyboardArrowLeft className='text-xl'/>
                    Back
                </button>
                <IconBtn text={"Save Changes"} disabled={loading}
                    customClasses={"flex items-center"}>
                        <MdKeyboardArrowRight className='text-xl'/>
                </IconBtn>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse