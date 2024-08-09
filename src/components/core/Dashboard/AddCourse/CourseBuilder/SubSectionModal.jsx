import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    } = useForm();

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle", modalData?.title);
            setValue("lectureDesc", modalData?.description);
            setValue("lectureVideo", modalData?.videoUrl);
        }
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ){
            return true
        }
        else{
            return false
        }
    }

    const handleEditSubSection = async() => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle);
        }

        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description", currentValues.lectureDesc);
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("videoFile", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if(result){
            const updatedCourseContent = course?.courseContent?.map((section) => (
                section._id === modalData.sectionId ? result : section
            ))
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async(data) => {
        if(view){
            return;
        }
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form")
            }
            else{
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);

        setLoading(true);
        const result = await createSubSection(formData,token);

        if(result){
            const updatedCourseContent = course?.courseContent?.map((section) => (
                modalData === section._id ? result : section
            ))
            const updatedCourse = {...course, courseContent : updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
        setLoading(false);
    }

  return (
    <div className='absolute w-[100vw] h-[100vh] left-0 top-0 z-50 flex items-center justify-center text-white
            bg-richblack-900 bg-opacity-10 backdrop-blur-sm '>
                <div className='w-[90%] md:w-[50%] bg-richblack-800 rounded-lg overflow-auto h-[90vh]
                    border-[1px] border-richblack-600'>
                    <div className='bg-richblack-700 rounded-t-lg border-b-[1px] border-richblack-600 px-6 py-4
                    flex items-center justify-between text-richblack-5'>
                        <p className='text-xl font-semibold'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                        <button onClick={() => (!loading? setModalData(null) : {})}>
                            <RxCross1 className='text-xl text-semibold'/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col w-full items-start px-6 py-4 gap-y-3'>
                            <Upload
                                name={"lectureVideo"}
                                label={"Lecture Video"}
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                video={true}
                                viewData={view? modalData.videoUrl : null}
                                editData={edit? modalData.videoUrl : null}
                            />

                            <div className='flex flex-col gap-y-1 w-full'>
                                <label htmlFor="lectureTitle">
                                    Lecture Title <sup className='text-sm text-pink-200'>*</sup>
                                </label>
                                <input 
                                    type="text"
                                    id='lectureTitle'
                                    placeholder='Enter lecture title'
                                    {...register("lectureTitle", {required:true})}
                                    className='bg-richblack-700 w-full rounded-lg px-3 py-3' 
                                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}} 
                                />
                                {
                                    errors?.lectureTitle && (
                                        <span className='text-pink-200 text-sm text-start'>Lecture title is required</span>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-y-1 w-full'>
                                <label htmlFor="lectureDesc">
                                    Lecture Description <sup className='text-sm text-pink-200'>*</sup>
                                </label>
                                <textarea 
                                    type="text"
                                    id='lectureDesc'
                                    placeholder='Enter lecture description'
                                    {...register("lectureDesc", {required:true})}
                                    className='bg-richblack-700 w-full rounded-lg px-3 py-3 min-h-[130px]' 
                                    style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"}}
                                />
                                {
                                    errors?.lectureDesc && (
                                        <span className='text-pink-200 text-sm text-start'>Lecture description is required</span>
                                    )
                                }
                            </div>

                            {
                                !view && (
                                    <div className={`flex justify-end w-full`}>
                                        <IconBtn
                                            text={loading?"Loading..." : edit? "Save Changes" : "Save"}/>
                                    </div>
                                )
                            }
                    </form>
                </div>
    </div>
  )
}

export default SubSectionModal