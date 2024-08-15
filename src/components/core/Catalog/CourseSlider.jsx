import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {FreeMode, Pagination} from 'swiper'
import CatalogCourseCard from './CatalogCourseCard';
import useWindowWidth from '../../../customHooks/useWindowWidth';


const CourseSlider = ({courses}) => {

    const windowWidth = useWindowWidth();

  return (
    <div>
      {
        courses?.length? 
        (
            <Swiper slidesPerView={(windowWidth>768) ? 4 : 2}
            spaceBetween={30}
            loop={true}
            grabCursor={true}
            className='mySwiper'>
                {
                    courses?.map((course) => (
                        <SwiperSlide key={course._id}>
                                <CatalogCourseCard course={course} height={"h-[150px] sm:h-[200px] md:h-[200px]"}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        ) 
        : 
        (
            <p className=''>No Courses found</p>
        )
      }
    </div>
  )
}

export default CourseSlider