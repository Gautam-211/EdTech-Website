import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(null);
    const [open, setOpen] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const setCourseSpecificDetails = async() => {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos));
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((section) => {
            lectures += section.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures));
    }

    useEffect(() => {
        setCourseSpecificDetails();
    },[])

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col lg:flex-row'>
        <VideoDetailsSidebar setReviewModal={setReviewModal} open={open}/> 

        <div className={`text-yellow-50 text-lg absolute top-[1rem] left-[2rem] lg:hidden mt-[4rem] flex items-center gap-x-2 w-11/12 mx-auto
        ${open?"translate-x-[57%]":""} transition-all duration-300 ease-in-out z-50`}
        onClick={() => setOpen((prev) => !prev)}>
            <FaArrowRight className={`${open?"rotate-180":""} transition-all duration-300 ease-in`}/>
        </div>

        <div className='h-[calc(100vh)] pt-[3.5rem] w-full overflow-auto relative'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
            </div>
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
  )
}

export default ViewCourse