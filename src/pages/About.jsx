import React from 'react'
import HighlightText from '../components/core/homepage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from '../components/core/AboutPage/Quote';
import FoundingStory from '../assets/Images/FoundingStory.png'
import LearningGrid from '../components/core/AboutPage/LearningGrid';

const statsData = [
    {
        title:"5K",
        subTitle:"Active Students"
    },
    {
        title:"10+",
        subTitle:"Mentors"
    },
    {
        title:"200+",
        subTitle:"Courses"
    },{
        title:"50+",
        subTitle:"Awards"
    },
]

const About = () => {
  return (
    <div className='bg-richblack-700 text-white w-full'>
        {/* section-1  */}
        <section className='w-11/12 max-w-maxContent mx-auto'>
            <div className='flex flex-col text-center gap-y-12 w-full mt-[5rem] relative'>
                <header className='flex flex-col text-4xl font-semibold lg:mb-[16.5rem]'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"}/>
                    <p className='mt-4 text-base font-normal mx-auto w-[57%] text-richblack-100'>Studynotion is at the forefront of driving innovation in online education. We're passionate about
                       creating a brighter future by offering cutting-edge courses, leveraging emerging technologies,
                       and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className='lg:absolute grid grid-cols-1 lg:grid-cols-3 place-items-center lg:flex-row items-center gap-4 lg:gap-10 justify-center 
                lg:-bottom-[25%] mb-4 w-2/3 lg:w-full mx-auto'>
                    <img src={BannerImage1} alt="aboutus banner 1" />
                    <img src={BannerImage2} alt="aboutus banner 2" />
                    <img src={BannerImage3} alt="aboutus banner 3" />
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section className='w-full bg-richblack-900 border-b-[0.5px] border-richblack-700'>
            <div className='w-11/12 max-w-maxContent mx-auto pt-[3rem] lg:pt-[10rem] mb-12'>
                <Quote/>
            </div>
        </section>

        {/* Section-3  */}
        <section className='w-full bg-richblack-900'>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-4'>

                {/* part-1  */}
                <div className='flex flex-col md:flex-row gap-12 justify-between my-[5rem] items-center'>

                    {/* content  */}
                    <div className='flex flex-col w-full md:w-[45%] gap-8 max-sm:text-center'>
                        <div className='text-4xl font-semibold bg-gradient-to-b from-[#833AB4]
                         via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text'>
                            Our Founding story
                        </div>
                        <div className='text-richblack-300'>
                            Our e-learning platform was born out of a shared vision and passion for transforming education.
                            It all began with a group of educators, technologists, and lifelong learners who recognized the 
                            need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving
                            digital world.
                        </div>
                        <div className='text-richblack-300'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of 
                            traditional education systems. We believed that education should not be confined to the walls 
                            of a classroom or restricted by geographical boundaries. We envisioned a platform that could 
                            bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </div>
                    </div>

                    {/* image  */}
                    <div className='w-[70%] md:w-[40%] flex items-center justify-center'>
                        <img src={FoundingStory} alt="" className='shadow-[0_0_20px_0] shadow-[#FC6767]'/>
                    </div>

                </div>

                {/* part-2  */}
                <div className='flex flex-col md:flex-row gap-8 justify-between  mb-[5rem] items-center max-sm:text-center'>

                    <div className='flex flex-col w-[90%] md:w-[40%] gap-8'>
                        <h1 className='text-4xl font-bold bg-gradient-to-b from-[#FF512F]  to-[#F09819] text-transparent
                        bg-clip-text '>
                            Our Vision
                        </h1>
                        <p className='text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would
                             revolutionize the way people learn. Our team of dedicated experts worked tirelessly to 
                             develop a robust and intuitive platform that combines cutting-edge technology with engaging 
                             content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className='flex flex-col w-[90%] md:w-[40%] gap-8'>
                        <div className='text-4xl'>
                            <HighlightText text={"Our Mission"}/>
                        </div>
                        <p className='text-richblack-300'>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                            community of learners, where individuals can connect, collaborate, and learn from one 
                            another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                            and we foster this spirit of collaboration through forums, live sessions, and networking 
                            opportunities.
                        </p>
                    </div>


                </div>  
            </div>

        </section>

        {/* Section-4  */}
        <section className='w-11/12 max-w-maxContent mx-auto py-[3rem] grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 text-center'>
            
            {
                statsData.map((stat,index) => (
                    <div key={index}>
                        <h1 className='text-4xl font-semibold'>{stat.title}</h1>
                        <p className='text-richblack-200'>{stat.subTitle}</p>
                    </div>
                ))
            }
            
        </section>

        {/* Section-5  */}
        <section className='w-full bg-richblack-900'>
            <LearningGrid/>
        </section>
    </div>
  )
}

export default About