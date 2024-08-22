import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn';
import { markLectureAsCompleted } from '../../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../../slices/viewCourseSlice';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player'

const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);
    
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificData = async() => {
            if(!courseSectionData?.length){
                return;
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses")
            }
            else{
                const filteredData = courseSectionData?.filter((section) => 
                    section._id === sectionId
                )

                const filteredVideoData = filteredData[0]?.subSection?.filter(
                    (lecture) => lecture._id === subSectionId
                )

                setVideoData(filteredVideoData?.[0]);
                setVideoEnded(false);
            }
        }
        
        if(courseSectionData){
            setVideoSpecificData();
        }

        // return () => {
        //     setVideoSpecificData();
        // }
    },[courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex===0 && currentSubSectionIndex === 0){
            return true
        }
        return false;
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === courseSectionData?.length-1 && 
            currentSubSectionIndex === noOfSubSections - 1){
            return true
        }
        return false;
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== noOfSubSections-1){
            //next video in same section
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex+1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            //first video of next section
            const nextSectionId = courseSectionData[currentSectionIndex+1]?._id;
            const firstSubSectionId = courseSectionData[currentSectionIndex+1]?.subSection[0]?._id
            //navigate to new video path 
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`)
        }
    }

    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== 0){
            //previous video in same section
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex-1]?._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            //first video of next section
            const prevSectionId = courseSectionData[currentSectionIndex-1]?._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex-1]?.subSection?.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex-1]?.subSection[prevSubSectionLength-1]?._id
            //navigate to new video path 
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    const handleLectureCompletion = async() => {
        setLoading(true);
        const res = await markLectureAsCompleted({courseId, subSectionId}, token);
        if(res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);
        if(isLastVideo()){
            return
        }
        goToNextVideo();
    }

  return (
    <div className='text-white'>
        {
            !videoData ? <p className='text-3xl'>No Data Found...</p> : (
                <div className='relative'>
                    <ReactPlayer
                        ref={playerRef}
                        playsinline
                        onEnded={() => setVideoEnded(true)}
                        url={videoData?.videoUrl}
                        controls={true}
                        stopOnUnmount={true}
                        width={"100%"}
                        height={"60%"}
                        playing={true}
                    >   
                    </ReactPlayer>
                    {
                        videoEnded && (
                            <div className='absolute top-0 left-0 z-40 w-full h-full flex flex-col items-center 
                            pt-[2rem] md:pt-[6rem] bg-richblack-900 bg-opacity-40 backdrop-blur-sm gap-3 text-xl'>
                                {
                                    !completedLectures?.includes(subSectionId)&& (
                                        <IconBtn text={!loading? "Mark as completed" : "Loading..."}
                                            disabled={loading}
                                            onclick={() => handleLectureCompletion()}/>
                                    )
                                }
                                
                                <IconBtn text={"Rewatch"}
                                    onclick={() => {
                                        if(playerRef?.current){
                                            playerRef.current?.seekTo(0);
                                            setVideoEnded(false);
                                        }
                                    }}
                                    customClasses={"text-xl"}></IconBtn>

                                    <div className='flex items-center gap-2'>
                                        {
                                            !isFirstVideo() && (
                                                <button className='bg-richblack-500 px-4 py-3 rounded-lg hover:bg-richblack-600 transition-all duration-200
                                                ease-linear' 
                                                onClick={goToPreviousVideo}
                                                disabled={loading}>
                                                    Previous
                                                </button>
                                            )
                                        }
                                        {
                                            !isLastVideo() && (
                                                <button className='bg-richblack-500 px-4 py-3 rounded-lg hover:bg-richblack-600 transition-all duration-200
                                                ease-linear' 
                                                onClick={goToNextVideo}
                                                disabled={loading}>
                                                    Next
                                                </button>
                                            )
                                        }
                                    </div>
                            </div>
                        )
                    }

                    <div className='flex flex-col gap-2 text-2xl mt-[1rem]'>
                        <p>{videoData?.title}</p>
                        <p className='text-lg text-richblack-300'>{videoData?.description}</p>
                    </div>
                </div>
            )
        } 

    </div>
  )
}

export default VideoDetails