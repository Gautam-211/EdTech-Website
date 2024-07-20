import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='w-full flex flex-col sm:flex-row items-center gap-20 mt-16'>

        <div className='w-[90%] mx-auto sm:w-1/2'>
            <img src={Instructor} alt="" className='shadow-white shadow-[-20px_-20px_0_0]' />
        </div>

        <div className='w-full sm:w-1/2 flex flex-col gap-10 items-center sm:items-start'>
            <div className='text-4xl font-semibold text-center sm:text-start'>
                Become an <br />
                <HighlightText text={"Instructor"}/>
            </div>

            <p className='text-center sm:text-start text-[16px] w-[80%] font-medium text-richblack-300'>
                 Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex gap-2 items-center'>
                    Start Learning Today
                    <FaArrowRight/>
                </div>
            </CTAButton>
        </div>

    </div>
  )
}

export default InstructorSection