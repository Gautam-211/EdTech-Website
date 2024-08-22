import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import RatingStars from './RatingStars'
import { fetchAllReviews } from '../../services/operations/pageAndComponentDataAPI'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import useWindowWidth from '../../customHooks/useWindowWidth'

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const windowWidth = useWindowWidth();
    const truncateWords = 15;

    useEffect(() => {
        const getAllReviews = async() => {
            const result = await fetchAllReviews();
            if(result){
                setReviews(result);
            }
        }
        getAllReviews();
    },[])

  return (
    <div className='w-full text-white h-[190px]'>
            <Swiper
            slidesPerView={(windowWidth>768)? 4 : 1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay:2500
            }}
            modules={[FreeMode,Pagination, Autoplay]}
            className='w-full'>
                {
                    reviews?.map((review) => (
                        <SwiperSlide key={review?._id} className='bg-richblack-800 px-4 py-3 flex flex-col cursor-grab'>
                            <div className='flex items-center gap-4'>
                                <img className='w-[3rem] rounded-full' 
                                    src={review?.user?.image? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} alt="" />
                                <div>
                                    <p>{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
                                    <p className='text-richblack-300'>{`${review?.course?.courseName}`}</p>
                                </div>
                            </div>
                            <div className='mt-4 text-sm'>
                                {review?.review}
                            </div>
                            <div className='mt-4 flex place-items-center gap-3'>
                                <p className='text-yellow-50'>{review?.rating}</p>
                                <RatingStars Review_Count={review?.rating} Star_Size={21}/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
    </div>
  )
}

export default ReviewSlider