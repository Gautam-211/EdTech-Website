import React from 'react'

const IconBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type}
    className={`${customClasses} bg-yellow-50 text-richblack-900 px-3 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-200 ease-linear`}>
        {
            children?  (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn