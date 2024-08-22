import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({open,setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    const setActiveFlags = () => {
        if(!courseSectionData?.length){
            return
        }
        const currentSectionIndex = courseSectionData?.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (data) => data._id === subSectionId
        )

        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
    }

    const handleActiveStatus = (id) => {
        if(activeStatus === id){
            setActiveStatus("");
            return;
        }
        setActiveStatus(id)
    }

    useEffect(() => {
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div className={`flex flex-col min-w-[250px] border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800
        py-5  mt-[3.5rem] max-lg:fixed ${open?"w-1/2 left-0 translate-x-0":"max-lg:-translate-x-full"}
        transition-all duration-300 ease-in-out z-50`}>
            <div className='flex flex-col text-white'>
                {/* buttons  */}
                <div className='flex items-center w-full justify-between px-3'>
                    <button className='p-1 rounded-full bg-richblack-600 hover:bg-richblack-700 transition-all
                    duration-200 ease-linear' onClick={() => navigate("dashboard/enrolled-courses")}>
                        <MdOutlineKeyboardArrowLeft className='text-4xl'/>
                    </button>
                    <div>
                        <IconBtn text={"Add Review"}
                            onclick={() => setReviewModal(true)}>
                        </IconBtn>
                    </div>
                </div>

                <div className='flex flex-col pb-[1rem] border-richblack-600 border-b-[1px] px-3 mt-6'>
                    <p className='text-2xl font-semibold'>{courseEntireData?.courseName}</p>
                    <p className='text-base text-richblack-300'>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>

                {/* Course Content section  */}
                <div className='flex flex-col w-full'>
                    {
                        courseSectionData?.map((section,i) => (
                            <div key={section._id} className='cursor-pointer'>
                                {/* section  */}
                                <div className={`flex items-center justify-between px-4 py-3 bg-richblack-700
                                    ${i !== courseSectionData?.length-1?"border-b-[1px] border-richblack-600":""}`}
                                    onClick={() => handleActiveStatus(section._id)}>
                                    <p>{section?.sectionName}</p>
                                    <MdKeyboardArrowDown className={`${activeStatus === section._id?"-rotate-180":""}
                                        transition-all duration-200 ease-linear`} />
                                </div>

                                {/* subSection  */}
                                <div>
                                    {
                                        activeStatus === section._id && (
                                            <div>
                                                {
                                                    section?.subSection?.map((lecture,index) => (
                                                        <div className={`flex item-center gap-3
                                                        px-4 py-2 ${index!== section?.subSection?.length-1?"border-b-[1px] border-richblack-500":""}
                                                        bg-richblack-600 ${videoBarActive===lecture._id?"bg-yellow-50 text-richblack-900":""}
                                                        transition-all duration-200 ease-linear`} 
                                                        key={lecture?._id}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData._id}/section/${section?._id}/sub-section/${lecture._id}`);
                                                            setVideoBarActive(lecture?._id)
                                                        }}>
                                                            <input type="checkbox" 
                                                                checked={completedLectures.includes(lecture?._id)}
                                                                onChange={() => {}}/>
                                                            <span>{lecture?.title}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
    </div>
  )
}

export default VideoDetailsSidebar