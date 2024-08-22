import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross1 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {courseEntireData} = useSelector((state) => state.viewCourse)

    const {
        register, 
        handleSubmit,
        setValue,
        formState:{errors}
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    const onSubmit = async(data) => {
        await createRating({courseId: courseEntireData._id, rating: data.courseRating, review: data.courseExperience}, token);
        setValue("courseExperience","");
        setValue("courseRating", 0);
        setReviewModal(null); 
    }

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

  return (
    <div className='absolute w-[100vw] h-[100vh] flex items-center justify-center bg-richblack-900 z-50
    bg-opacity-40 backdrop-blur-sm'>
        <div className='bg-richblack-900 w-[90%] md:w-[40%] border-[1px] border-richblack-600 rounded-lg 
        overflow-hidden text-white flex flex-col items-center'> 
            <div className='flex items-center justify-between bg-richblack-800 py-2 px-4 w-full'>
                <p className='text-lg md:text-xl'>Add Review</p>
                <button onClick={() => setReviewModal(null)}>
                    <RxCross1 className='text-xl'/>
                </button>
            </div>

            <div className='flex items-center gap-3 pt-2 pb-2'>
                <img src={user?.image} alt="" className='w-[2.4rem] md:w-[3.5rem] rounded-full aspect-square'/>
                <div className='text-sm'>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className='text-richblack-50'>Posting Publicly</p>
                </div>
            </div>

            {/* Review Star Input  */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-center'>
                <ReactStars
                    classNames={""}
                    count={5}
                    onChange={ratingChanged}
                    size={30}
                    activeColor="#ffd700"/>

                    <div className='flex flex-col w-full items-start px-4 gap-1 mb-3'>
                        <label htmlFor="courseExperience">Add your experience</label>
                        <textarea name="courseExperience" id="courseExperience"
                            {...register("courseExperience", {required:true})}
                            placeholder='Enter your experience here'
                            className='bg-richblack-700 rounded-lg w-full px-2 py-3 min-h-[150px]'/>
                        {
                            errors?.courseExperience && (
                                <span className='text-sm text-pink-200'>Please add your experince</span>
                            )
                        }
                    </div>

                    <div className='w-full flex justify-end px-4 gap-2 mb-6'>
                        <button onClick={() => setReviewModal(null)}
                            className='px-3 py-2 bg-richblack-600 rounded-lg' 
                            type='button'>
                            Cancel
                        </button>
                        <IconBtn type={"submit"} text={"Save"} />
                    </div>
            </form>
        </div>
    </div>
  )
}

export default CourseReviewModal