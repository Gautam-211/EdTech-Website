import React from 'react'
import HighlightText from '../homepage/HighlightText'

const Quote = () => {
  return (
    <div className='w-full text-3xl md:text-4xl text-center font-semibold'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology"}/>
        ,
        <span className='font-bold bg-gradient-to-b from-[#FF512F]  to-[#F09819] text-transparent
        bg-clip-text '>
            expertise
        </span>
        , and community to create an 
        <span className='font-bold bg-gradient-to-b from-[#FF512F]  to-[#F09819] text-transparent
        bg-clip-text '>
            {" "}
            unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote