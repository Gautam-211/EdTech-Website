import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton'

const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-4 items-center mt-[8rem] md:mt-[10rem]'>
        
        <div className='text-4xl font-semibold text-center'>
            Your Swiss knife for 
            <HighlightText text={" learning any Language"}/>
        </div>

        <div className='text-center text-richblack-600 text-base font-medium w-[100%] md:w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center'>

            <img src={know_your_progress} alt="know your progress" className='md:-mr-32' />

            <img src={compare_with_others} alt="compare with others" className='max-sm:-mt-28' />

            <img src={plan_your_lesson} alt="plan your lessons" className='md:-ml-36 max-sm:-mt-32'/>

        </div>

        <div>
            <CTAButton active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
            </CTAButton>
        </div>

    </div>
  )
}

export default LearningLanguageSection