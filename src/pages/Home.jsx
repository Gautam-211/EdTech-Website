import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from '../components/core/homepage/CTAButton'
import HighlightText from '../components/core/homepage/HighlightText'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/homepage/CodeBlocks'

const Home = () => {
  return (
    <div className='w-11/12 flex flex-col '>
        {/* Section-1 */}
        
        <div className='max-w-maxContent relative mx-auto flex flex-col w-full items-center text-white justify-between'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-300 transition-all duration-200
                hover:scale-95 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none hover:text-richblack-25'>
                    <div className='flex justify-center items-center gap-2 rounded-full px-10 py-[5px] 
                    group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] text-center text-lg font-bold text-richblack-300 mt-4'>
                With our online Coding Courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth
                of resources, including hands-on projects, quizzes and personalized feedback from instructors.
            </div>

            <div className='flex gap-7 mt-12'>

                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>

            </div>

            <div className='w-full shadow-blue-200 my-16 mx-3 shadow-[0px_-20px_80px_-20px_rgba(0,0,0,0.5)]'>
                <video muted loop autoPlay className='shadow-[20px_20px_rgba(255,255,255)]'>
                    <source src={Banner}/>
                </video>
            </div>

            {/* Code Section-1 */}

            <div className='w-full'>
                <CodeBlocks 
                    position={"md:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"Coding Potential "}/>
                            with our Online Courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="/one">One</a>\n<a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`}

                    codeColor={"text-yellow-25"}

                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* Code Section -2  */}

            <div className='w-full'>
                <CodeBlocks 
                    position={"md:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Start
                            <HighlightText text={"Coding in Seconds "}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/login",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/signup",
                            active:false
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Basic HTML Example</title>\n</head>\n<body>\n<h1>Hello everyone</h1>\n<h2>Welcome to My Website</h2>\n<p>This is a basic example of an HTML document.</p>\n</body>\n</html>`}

                    codeColor={"text-white"}

                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>

        </div>

        {/* Section-2  */}

        <div className='bg-pure-gray-'>

        </div>

 
    </div>
  )
}

export default Home