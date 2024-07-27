import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame (1).png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Spinner from "../../common/Spinner/Spinner"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid place-items-center pt-4 w-full">
      {loading ? (
        <div className='absolute top-[45vh]'>
            <Spinner/>
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-y-12 py-14 md:py-10 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px]">
            <h1 className="text-[1.875rem] max-sm:text-center font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px]">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template