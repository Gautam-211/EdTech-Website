import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import { GetAvgRating } from '../../../utils/avgRating';

const CatalogCourseCard = ({course, height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])

  return (
    <Link to={`/courses/${course._id}`}>
        <div className='flex flex-col gap-1 text-richblack-300'>
            <img src={course.thumbnail} alt="" className={`${height} w-full rounded-lg `}/>
            <p className='text-richblack-25'>{course.courseName}</p>
            <p>{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
            <div className='flex items-center gap-1'>
                <span>{`${avgReviewCount || 0}`}</span>
                <RatingStars Review_Count={avgReviewCount}/>
                <span>{`(${course?.ratingAndReviews?.length})`}</span>
            </div>
            <p className='text-lg text-white'>Rs.{course.price}</p>
        </div>
    </Link>
  )
}

export default CatalogCourseCard