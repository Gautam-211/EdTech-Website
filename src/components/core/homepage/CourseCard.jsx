import React from 'react'
import { HiUsers } from 'react-icons/hi'
import { ImTree } from 'react-icons/im'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`max-w-[360px] w-[80%] md:w-[30%] aspect-square flex flex-col justify-between px-5 py-7 
    ${currentCard === cardData.heading?"bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-800"}
    text-richblack-25 h-[300px] box-border cursor-pointer hover:shadow-xl hover:border-brown-50 hover:scale-[1.07]
     transition-all ease-in-out`}
    onClick={() => setCurrentCard(cardData.heading)}>

        <div className='flex flex-col gap-3'>

            <div className={`font-bold text-[20px] ${currentCard===cardData.heading?"text-black":""}`} >
                {cardData.heading}
            </div>

            <div className={`text-base ${currentCard===cardData.heading?"text-richblack-400":"text-richblack-300"}`}>
                {cardData.description}
            </div>

        </div>
        
        <div className={`border-t-2 pt-2 flex w-full justify-between items-center text-[16px] ${currentCard===cardData.heading?"text-blue-300 hover:text-blue-500"
            : "text-richblack-300 hover:text-white"}`}>
            <div className='flex gap-2 items-center'>
                <HiUsers/>
                {cardData.level}
            </div>
            <div className={`flex items-center gap-2`}>
                <ImTree/>
                {`${cardData.lessonNumber} Lessons`}
            </div>
        </div>

    </div>
  )
}

export default CourseCard