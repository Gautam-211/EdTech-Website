import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {

    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName","");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true))
    }

    const goToNext = () => {
        if(course.courseContent.length === 0){
            toast.error("Add atleast one Section.");
            return;
        }
        if(course.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Add atleast one lecture in each section");
            return
        }

        dispatch(setStep(3));
    }

    const onSubmit = async(data) => {
        setLoading(true);
        let result;

        if(editSectionName){
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id
            },token)
        }
        else{
            result = await createSection({
                sectionName:data.sectionName,
                courseId : course._id,
            },token)
        }

        //update values
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {

        if(editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

  return (
    <div className='text-white mt-10 md:mr-12 flex flex-col items-start w-full bg-richblack-800 px-5 py-7 
    rounded-lg gap-y-4'>
        <p className='text-2xl font-semibold'>Course Builder</p>
        <form className='w-full flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full gap-y-1'>
                <label htmlFor="sectionName">
                    Section Name <sup className='text-pink-100'>*</sup> 
                </label>
                <input type="text"
                    id='sectionName'
                    placeholder='Add Section name'
                    {...register("sectionName", {required:true})}
                    className='bg-richblack-700 w-full rounded-lg px-3 py-2' 
                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}  
                />
                {
                    errors.sectionName && (
                        <span className='text-pink-200 text-sm text-start'>Section name is required</span>
                    )
                }
            </div>
            <div className='flex items-center gap-x-3'>
                <IconBtn 
                    type={"submit"}
                    text={editSectionName?"Edit Section Name":"Create Section"}
                    outline={true}
                    customClasses={"bg-opacity-0 border-[1px] border-yellow-50 text-yellow-50 font-semibold hover:text-richblack-800 flex items-center gap-x-2"}
                >
                    <GrAddCircle/>
                </IconBtn>
                {
                    editSectionName && (
                        <button className='outline-none bg-none underline text-richblack-400 text-sm'
                        onClick={cancelEdit} type='button'>
                            Cancel Edit
                        </button>
                    )
                }
            </div>
        </form>

        {
            course?.courseContent?.length>0 && (
                <NestedView
                    handleChangeEditSectionName={handleChangeEditSectionName}
                />
            )
        }

        <div className='w-full flex items-center justify-end gap-x-3'>
            <button onClick={goBack}
                className='px-3 py-2 rounded-lg bg-richblack-600 hover:bg-opacity-80 transition-all duration-200 
                ease-linear flex items-center '>
                <MdKeyboardArrowLeft className='text-xl'/>
                Back
            </button>
            <IconBtn text={"Next"} onclick={goToNext}
             customClasses={"flex items-center"}>
                <MdKeyboardArrowRight className='text-xl'/>
            </IconBtn>
        </div>

    </div>
  )
}

export default CourseBuilderForm