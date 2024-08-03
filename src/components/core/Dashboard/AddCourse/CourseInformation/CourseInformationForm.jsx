import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../services/apiconnector';
import { categories } from '../../../../../services/apis';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors,isSubmitSuccessful}
    } = useForm()

    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const getCategories = async() => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if(categories.length>0){
            setCourseCategories(categories);
        }
        setLoading(false)
    }

    const onSubmit = () => {

    }

    useEffect(() => {
        getCategories();

        if(editCourse){
            setValue("courseTitle",course.courseName);
            setValue("courseShortDesc",course.courseDescription);
            setValue("coursePrice",course.price);
            setValue("courseTags",course.tag);
            setValue("courseBenefits",course.whatYouWillLearn);
            setValue("courseCategory",course.category);
            setValue("courseRequirements",course.instructions);
            setValue("courseImage",course.thumbnail);
        }

        //cleanup function
        return () => {getCategories()};
    },[])

  return (
    <form className='text-richblack-5 w-full text-center md:mr-12 mt-10 bg-richblack-800 px-4 py-8 flex flex-col 
    items-start rounded-lg gap-y-4'
    onSubmit={handleSubmit(onSubmit)}>

        {/* Course title  */}
        <label className='w-full flex flex-col gap-y-1'>
            <p className='text-start'>Course Title <sup className='text-pink-100'>*</sup></p>
            <input 
                className='bg-richblack-700 w-full rounded-lg px-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                id='courseTitle'
                {...register("courseTitle",{required:true})}
                placeholder='Enter course title' />

            {
                errors.courseTitle && (
                    <span className='text-pink-200 text-sm text-start'>Course title is required</span>
                )
            }
        </label>

        {/* Course Descritpion  */}
        <label className='w-full flex flex-col gap-y-1'>
            <p className='text-start'>Course short description <sup className='text-pink-100'>*</sup></p>
            <textarea  
                className='bg-richblack-700 w-full rounded-lg px-3 py-2' 
                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                rows={5}
                id='courseShortDesc'
                {...register("courseShortDesc",{required:true})}
                placeholder='Enter course description' />

            {
                errors.courseShortDesc && (
                    <span className='text-pink-200 text-sm text-start'>Course description is required</span>
                )
            }
        </label>

        {/* Course Price  */}
        <label className='w-full flex flex-col gap-y-1 relative'>
            <span className='absolute top-[2.2rem] left-[0.5rem] text-2xl text-richblack-300'>
                <HiOutlineCurrencyRupee/>
            </span>
            <p className='text-start'>Price <sup className='text-pink-100'>*</sup></p>
            <input 
                className='bg-richblack-700 w-full rounded-lg pl-[2.5rem] pr-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                id='coursePrice'
                {...register("coursePrice",{
                    required:true,
                    valueAsNumber:true,
                    pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                })}
                placeholder='Enter course price' />

            {
                errors.coursePrice && (
                    <span className='text-pink-200 text-sm text-start'>Course price is required</span>
                )
            }
        </label>

        {/* Course Category  */}
        <label className='w-full flex flex-col gap-y-1'>
            <p className='text-start'>Category <sup className='text-pink-100'>*</sup></p>
            <select 
                className='bg-richblack-700 w-full rounded-lg px-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                id='courseCategory'
                defaultValue={""}
                {...register("courseCategory",{required:true})}
                placeholder='Enter course category'>

                    <option value="" disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category) => (
                            <option key={category._id} value={category?._id}>{category?.name}</option>
                        ))
                    }

            </select>

            {
                errors.courseCategory && (
                    <span className='text-pink-200 text-sm text-start'>Course category is required</span>
                )
            }
        </label>

        {/* Course tags  */}
        <ChipInput
            register={register}
            errors={errors}
        />

    </form>
  )
}

export default CourseInformationForm