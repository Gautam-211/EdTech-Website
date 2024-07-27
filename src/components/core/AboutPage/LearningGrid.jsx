import React from 'react'
import HighlightText from '../homepage/HighlightText';
import CTAButton from '../homepage/CTAButton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Our learning method combines flexible and practical approaches to ensure a comprehensive and engaging educational experience.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion provides industry-recognized certification to validate your new skills and enhance your career prospects.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion’s auto-grading feature provides instant, objective feedback to help learners assess their understanding and progress efficiently.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion equips learners with job-ready skills, preparing them to excel in the workforce.",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto grid grid-cols-1 md:grid-cols-4 py-[5rem]'>
        {
            LearningGridArray.map((card,index) => (
                <div key={index} 
                className={`${index===0 ? "md:col-span-2":"col-span-1"}
                    ${card.order%2===1? "bg-richblack-700":"bg-richblack-800"}
                    ${card.order===3?"md:col-start-2":""} max-sm:text-center`}>
                        {
                            card.order<0? (
                                <div className='bg-richblack-900 flex flex-col items-center md:items-start gap-y-4 h-full
                                    max-sm:pb-10'>
                                    <h1 className='text-4xl font-bold flex flex-col'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText}/>
                                    </h1>
                                    <p className='text-richblack-300'>
                                        {card.description}
                                    </p>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            )
                            :
                            (
                                <div className='flex flex-col gap-6 px-8 pt-10 pb-[5rem]'>
                                    <h1 className='text-white'>{card.heading}</h1>
                                    <p className='text-richblack-300'>{card.description}</p>
                                </div>
                            )
                        }       
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid