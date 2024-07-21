import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';


const tabsName = [
    "Free","New to coding","Most popular","Skill paths","Career paths"
] 

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div className='md:relative w-full flex flex-col items-center'>

        <div className='text-4xl font-semibold text-center'>
            Unlock the 
            <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-[13px] sm:text-[16px] mt-2'>
            Learn to build anything you can imagine
        </p>

        <div className='p-1 flex w-fit justify-center gap-2 bg-richblack-700 rounded-lg sm:rounded-full mt-5 shadow-md shadow-richblack-600 md:mb-[9rem]'>
            {
                tabsName.map((element,index) => {
                    return(
                        <div key={index}
                        className={`text-[13px] sm:text-[16px] flex items-center gap-2 
                        ${currentTab===element?
                            "bg-richblack-900 text-richblack-5 font-medium rounded-lg sm:rounded-full"
                            :
                            "text-richblack-200"}
                            transition-all duration-200 ease-in cursor-pointer px-3 sm:px-7 py-2 hover:bg-richblack-900
                            hover:text-richblack-5 hover:font-medium hover:rounded-lg sm:hover:rounded-full text-center`}
                            onClick={() => setMyCards(element)}>

                            {element}
                        </div>
                    )
                })
            }
        </div>

        {/* course cards  */}

        <div className='md:absolute max-sm:mt-12 -bottom-[13rem] z-10 flex flex-col items-center md:flex-row gap-10 justify-between w-full'>
            {
                courses.map((element,index) => {
                    return (
                        <CourseCard key={index}
                        cardData={element}
                        currentCard = {currentCard}
                        setCurrentCard={setCurrentCard}/>
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore