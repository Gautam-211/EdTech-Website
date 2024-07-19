import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex w-full flex-col ${position} my-16 md:my-20 md:justify-between gap-14 md:gap-10 justify-center items-center`}>

        {/* Secrion-1  */}
        <div className='md:w-[50%] flex flex-col gap-8 text-center md:text-start'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='gap-7 flex mt-7 justify-center md:justify-start '>

                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center justify-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}    
                </CTAButton>

            </div>
        </div>

        {/* Section-2 */}
        
        <div className='w-[90%] md:w-[40%] flex justify-start h-fit p-2 code-border border-2 relative'>
            {/* Add back gradient  */}

            {backgroundGradient}

            <div className='w-[10%] text-center flex flex-col text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                <TypeAnimation
                sequence={[codeblock,1000, ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block",
                        gap:"2rem"
                    }
                }/>
            </div>

        </div>

    </div>
  )
}

export default CodeBlocks