import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {


    const {token} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors,isSubmitSuccessful}
    } = useForm()

    const dispatch = useDispatch();

    // dispatch(setStep(2))

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

    const isFormUpdated =() => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course?.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            // currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        )
            return true
        else
            return false; 
    }

    const onSubmit = async (data) => {
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);

                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }

                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", JSON.stringify(data.courseTags))
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }

                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                // if (currentValues.courseImage !== course.thumbnail) {
                //     formData.append("thumbnailImage", data.courseImage)
                // }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);

                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made to the form");
                dispatch(setStep(2));
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)  

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
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
            label={"Tags"}
            name={"courseTags"}
            placeholder={"Enter tags and press enter"}
            setValue={setValue}
            getValues={getValues}
        />

        <Upload
            name={"courseImage"}
            label={"CourseThumbnail"}
            register={register}
            errors={errors}
            setValue={setValue}
            editData={editCourse? course?.thumbnail : null}
        />

        {/* Benefits of the course   */}
        <label className='w-full flex flex-col gap-y-1'>
            <p className='text-start'>Benefits of the course <sup className='text-pink-100'>*</sup></p>
            <textarea 
                className='bg-richblack-700 w-full rounded-lg px-3 py-2' style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                id='courseBenefits'
                {...register("courseBenefits",{required:true})}
                placeholder='Enter course benefits' 
                rows={5}/>

            {
                errors.courseBenefits && (
                    <span className='text-pink-200 text-sm text-start'>Course benefits are required</span>
                )
            }
        </label>

        {/* Requirement Field  */}
        <RequirementField
            name={"courseRequirements"}
            placeholder={"Enter requirement or instructions"}
            label={"Requirements/Instructions"}
            register= {register}
            error={errors}
            setValue={setValue}
            getValues ={getValues}
        />

        <div className='flex items-center justify-end w-full gap-x-2'>
            {
                editCourse && (
                    <button className='px-3 py-2 rounded-lg bg-richblack-400 text-richblack-25 hover:scale-95 
                    transition-all duration-200 ease-linear'
                    onClick={() => {dispatch(setStep(2))}} type='button'>
                        Continue without saving
                    </button>
                )
            }

            <IconBtn
                text={!editCourse? "Next" : "Save Changes"}/>
        </div>

    </form>
  )
}

export default CourseInformationForm