import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { GetAvgRating } from '../utils/avgRating';
import Spinner from '../components/common/Spinner/Spinner';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { BiInfoCircle } from 'react-icons/bi';
import { formattedDate } from '../utils/dateFormatter';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { ACCOUNT_TYPE } from '../utils/constants';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

const CourseDetails = () => {

    const {user, loading} = useSelector((state) => state.profile)
    const {paymentLoading} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const {cart} = useSelector((state) => state.cart)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    const [isActive, setIsActive] = useState([]);
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)? isActive.concat(id) : isActive.filter((e) => e!==id)
        );
    }


    const getCourseData = async() => {
        const response = await fetchCourseDetails(courseId);
        if(response){
            setCourseData(response);
        }
    }

    useEffect(() => {
        getCourseData();
    },[courseId])

    useEffect(() => {
        if(courseData){
            const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
            setAvgReviewCount(count);

            let lectures = 0;
            courseData?.data?.courseDetails?.courseContent?.forEach((section) => {
                const lecturesInSection = section.subSection.length || 0;
                lectures += lecturesInSection;
            })

            setTotalNoOfLectures(lectures);
        }
    },[courseData])

    const handleBuyCourse = () => {
        if(!token){
            setConfirmationModal({
                text1:"You are not logged in!",
                text2:"Please login to purchase the course",
                btn1Text:"Login",
                btn2Text:"Cancel",
                btn1Handler : () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null)
            })
        }
        else{
            buyCourse(token, [courseId], user, navigate, dispatch);
            return
        }
    }

    if(loading || !courseData){
        return (
            <div className='absolute top-[45vh]'>
                    <Spinner/>
            </div>
        )
    }

    if(!courseData.success){
        return <Error/>
    }

    const handleAddToCart = ( ) => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Instructor cannot buy a course!")
            return
        }
        if(token){
            dispatch(addToCart(courseData?.data?.courseDetails));
            return 
        }
        setConfirmationModal({
            text1:"Do you want to log in?",
            text2:"You are not logged in currently",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => {navigate("/dashboard/login")},
            btn2Handler:() => {setConfirmationModal(null)}
        })
    }

    const handleRemoveFromCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Instructor cannot buy a course!")
            return
        }
        if(token){
            dispatch(removeFromCart(course_id));
            return 
        }
        setConfirmationModal({
            text1:"Do you want to log in?",
            text2:"You are not logged in currently",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => {navigate("/login")},
            btn2Handler:() => {setConfirmationModal(null)}
        })
    }

    const {
        _id:course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        category,
        createdAt 
    } = courseData?.data?.courseDetails ;


  return (
    <div className='text-white w-full mt-14'>

        <div className='bg-richblack-800 w-full py-8 flex flex-col-reverse md:flex-col '>
            <div className='mx-auto max-w-maxContent w-11/12 relative'>

                {/* Buy Course Card  */}
                <div className='max-sm:hidden absolute top-0 left-[70%] w-[27%]'>
                    <CourseDetailsCard handleBuyCourse={handleBuyCourse} course={courseData?.data?.courseDetails} 
                    setConfirmationModal={setConfirmationModal}/>
                </div>

                <div className='flex flex-col gap-2 w-[100%] md:w-[70%] max-sm:items-center'>
                    <div className='md:hidden w-[80%] mx-auto mb-[2rem] rounded-lg overflow-hidden '>
                        <img src={thumbnail} alt="" className=' '/>
                    </div>
                    <div className='flex items-center text-richblack-300 gap-1 max-sm:hidden'>
                        <p>Home / Learning /</p>
                        <span className='text-yellow-50'>{` ${category.name}`}</span>
                    </div>
                    <p className='text-3xl'>{courseName}</p>
                    <p className='text-richblack-300 max-sm:text-center'>{courseDescription}</p>
                    <div className='flex items-center gap-2 text-richblack-300'>
                        <p className='text-yellow-50'>{avgReviewCount}</p>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <p>{`(${ratingAndReviews.length} ratings)`}</p>
                        <p>{studentsEnrolled.length} students</p>
                    </div>
                    <p className='text-richblack-200'>Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
                    <div className='flex items-center gap-2 text-richblack-200 max-sm:pb-[1rem] w-full max-sm:border-b-[1px]
                    border-richblack-600 max-sm:justify-center'>
                        <div className='flex items-center gap-1'>
                            <BiInfoCircle className='text-richblack-25'/>
                            Created at {formattedDate(createdAt)}
                        </div>
                        <div className='flex items-center gap-1'>
                            <HiOutlineGlobeAlt className='text-richblack-25'/>
                            English
                        </div>
                    </div>
                    {/* cart and buy button  */}
                    <div className='md:hidden w-[80%] mt-[1rem]' >
                        <p className='text-white text-2xl'>Rs.{price}</p>
                        <div className='mt-[1rem] flex flex-col gap-2'>
                        <button className='w-full rounded-lg bg-yellow-50 px-3 py-2 text-richblack-900
                        hover:bg-yellow-200 transition-all duration-200 ease-linear'
                        onClick={
                            user && studentsEnrolled?.includes(user?._id)?
                            () => navigate("/dashboard/enrolled-courses") : handleBuyCourse 
                        }>
                    {
                        user && studentsEnrolled?.includes(user?._id)?"Go to Course" : "Buy Course"
                    }
                </button>
                            {
                                !studentsEnrolled?.includes(user?._id) &&
                                (
                                    cart.some((item) => item._id === course_id) ? 
                                    (
                                        <button className='w-full rounded-lg bg-red bg-opacity-50 text-richblack-50 px-3 py-2
                                        hover:opacity-70 transition-all duration-200 ease-linear'
                                        onClick={handleRemoveFromCart}>
                                            Remove from Cart
                                        </button>
                                    ) :
                                    (
                                        <button className='w-full rounded-lg bg-caribbeangreen-300 text-richblack-900 px-3 py-2
                                        hover:bg-caribbeangreen-400 transition-all duration-200 ease-linear'
                                        onClick={handleAddToCart}>
                                            Add to Cart
                                        </button>
                                    )
                                )
                            
                            }
                        </div>
                    </div>
                </div>

            </div>

            
        </div>

        <div className='max-w-maxContent w-11/12 mx-auto mt-[2rem]'>
            <div className='w-full md:w-[67%]'>
                {/* What you will learn section  */}
                <div className='w-full border-[1px] border-richblack-600 rounded-lg max-sm:text-center py-6 px-4'>
                    <p className='text-3xl w-full'>What you will learn</p>
                    <p className='text-richblack-300 w-full'>{whatYouWillLearn}</p>
                </div>

                {/* Course Content  */}
                <div className='w-full flex flex-col items-start mt-[3rem] gap-3'>
                    <p className='w-full max-sm:text-center text-3xl'>Course Content</p>
                    <div className='flex max-sm:flex-col gap-1 items-center w-full justify-between'>
                        <span className='text-richblack-300'>
                            {courseContent?.length} sections • {totalNoOfLectures} lectures • {courseData?.data?.totalDuration} total length
                        </span>
                        <button className='text-yellow-50' onClick={() => setIsActive([])}>
                            Collapse all Sections
                        </button>
                    </div>
                    <div className='flex flex-col w-full text-richblack-100 rounded-md overflow-hidden mb-[1rem]
                    border-[1px] border-richblack-600' >
                        {
                            courseContent?.map((section) => (
                                <div  key={section?._id}>
                                    <div className='w-full flex items-center justify-between p-4 bg-richblack-700
                                    border-[1px] border-richblack-600 cursor-pointer'
                                    onClick={() => handleActive(section._id)}>
                                        <div className='flex items-center gap-2 text-lg'>
                                            <IoIosArrowDown className={`${isActive.includes(section._id)?"-rotate-180":""}
                                            transition-all duration-200 ease-linear`}/>
                                            {section.sectionName}
                                        </div>
                                        <div className='text-yellow-50'>
                                            {section?.subSection?.length} lecture(s)
                                        </div>
                                    </div>
                                    {
                                        section?.subSection.map((lecture) => (
                                            <div className={`w-full flex items-center gap-2 transition-all duration-200 ease-linear
                                            ${isActive.includes(section._id)?"p-4 border-[1px] border-richblack-600":"h-[0px]"} `}
                                            key={lecture?._id}>
                                                {
                                                    isActive.includes(section._id) && 
                                                    <>
                                                    <MdOutlineOndemandVideo/>
                                                    {lecture.title}
                                                    </>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className='w-full flex flex-col gap-3 mb-[1rem]'>
                        <p className='text-3xl'>Author</p>
                        <div className='flex items-center gap-3'>
                            <img src={instructor?.image} alt="" className='w-[4rem] aspect-square rounded-full'/>
                            <p className='text-lg'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                            <p>{instructor?.additionalDetails?.about}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}

export default CourseDetails