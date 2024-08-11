import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { IoIosArrowUp } from 'react-icons/io'
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)
    const [open,setOpen] = useState(false);

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        const categories = await fetchCourseCategories();
        if(categories.length>0){
            setSubLinks(categories);
        }
    }

    useEffect(() => {
            fetchSubLinks();

            return () => {fetchSubLinks()}
    },[])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }


  return (
    <div className='fixed bg-opacity-50 z-50 flex h-14 items-center justify-center border-b-[1px]
     border-b-richblack-700 w-full shadow-lg inset-0 bg-richblack-900 backdrop-blur-md'>
        <div className='w-11/12 flex max-w-maxContent justify-between items-center'>
            {/* Logo  */}
            <Link to={"/"}>
                <img src={logo} alt="StudyNotion Logo" width={160} height={42} loading='lazy'/>
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className={`flex gap-x-6 text-richblack-25 items-center max-sm:-translate-y-ful transition-all duration-1000 ease-in-out  
                    ${open?"max-sm:block flex-col absolute translate-y-0 pt-4 w-screen items-center bg-richblack-900 opacity-90 backdrop-blur-md top-0 left-0 z-40":
                    "max-sm:hidden"}`}>
                    {
                        NavbarLinks.map((link,index) => {
                            return (
                                <li className='flex items-center justify-center py-2' key={index}>
                                    {
                                        link.title === "Catalog" ? 
                                            (
                                                <div className='relative flex items-center gap-x-2 group cursor-pointer'>

                                                    <p>{link.title}</p>
                                                    <IoIosArrowUp className='group-hover:rotate-180 transition-all duration-100 ease-linear'/>

                                                    <div className='z-10 invisible absolute left-[-110px] top-[40px]
                                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900 gap-y-1
                                                    opacity-0 transition-all duration-200 group-hover:visible
                                                    group-hover:opacity-100 lg:w-[300px]'>
                                                        
                                                        <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-5
                                                        translate-x-[80%] translate-y-[-20%] -z-10'></div>

                                                        {
                                                            subLinks.length? (
                                                                subLinks.map( (subLink) => (
                                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={subLink._id}>
                                                                                <p className='hover:bg-richblack-25 px-3 py-2 rounded-md'>{subLink.name}</p>
                                                                        </Link>
                                                                ))                                                                
                                                            ) : (<div></div>)
                                                        }
                                                    
                                                    </div>

                                                </div>
                                            ) 
                                            : 
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}
                                                    hover:scale-90 transition-all duration-200 ease-in`}>
                                                        {link?.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            {/* Login/SigIn/Dashboard/Logout  */}

            <div className='flex gap-x-6 items-center max-sm:gap-x-3'>

                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={"/dashboard/cart"} className='relative text-white text-2xl'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems>0 && (
                                    <span className='absolute text-base  rounded-full bg-caribbeangreen-200
                                     animate-bounce -right-3 -top-2 w-[1.5rem] h-[1.5rem] flex items-center justify-center'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] max-sm:px-[8px] max-sm:py-[5px]
                            text-richblack-100 rounded-md hover:bg-caribbeangreen-300 hover:border-caribbeangreen-200
                            transition-all duration-200 ease-in hover:text-caribbeangreen-800'>
                                Log in
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] max-sm:px-[8px] max-sm:py-[5px]
                            text-richblack-100 rounded-md hover:bg-caribbeangreen-300 hover:border-caribbeangreen-200
                            transition-all duration-200 ease-in hover:text-caribbeangreen-800'>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown/>
                }

                <div className='z-50 md:hidden flex relative flex-col gap-y-2 w-[2rem] aspect-square justify-center cursor-pointer items-center' 
                        onClick={() => setOpen((prev) => !prev)}>
                    <div className={`${open?"rotate-45 absolute":""} transition-all duration-300 ease-linear h-[3px] 
                    rounded-xl bg-richblack-500 w-full`}></div>

                    <div className={`${open?"invisible":"visible"} h-[3px] rounded-xl bg-richblack-500 w-full`}></div>

                    <div className={`${open?"-rotate-45 absolute":""} h-[3px] transition-all duration-300 ease-linear
                     rounded-xl bg-richblack-500 w-full`}></div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar