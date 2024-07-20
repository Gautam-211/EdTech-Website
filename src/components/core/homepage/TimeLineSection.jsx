import React from 'react'
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";


const timeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const TimeLineSection = () => {
  return (
    <div className='w-11/12 flex flex-col md:flex-row justify-between items-center gap-10 mx-auto max-w-maxContent mb-10'>

        <div className='max-sm:mx-auto max-sm:w-fit w-[45%] flex flex-col gap-10 md:gap-16 md:ml-10'>
        {timeLine.map((element, index) => {
            return (
              <div className='flex gap-6 items-center' key={index}>

                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center shadow-lg'>
                        <img src={element.Logo} alt="" />
                    </div>

                    <div className='flex flex-col '>
                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                        <p className='text-base'>{element.Description}</p>
                    </div>
                
              </div>
            );
          })}
        </div>

        <div className='relative w-full md:w-[45%] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.5)] shadow-blue-200'>

            <img src={TimeLineImage} alt="timeLinePicture" className='shadow-[20px_20px_rgba(255,255,255)]' />

            <div className='absolute left-0 max-sm:top-0 timeline-image md:left-4 md:-bottom-14 bg-caribbeangreen-700 flex flex-col md:flex-row text-white uppercase py-4 md:py-10'>

                <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='md:text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='flex gap-5 items-center px-7'>
                    <p className='md:text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                </div>

            </div>

        </div>

    </div>
  )
}

export default TimeLineSection