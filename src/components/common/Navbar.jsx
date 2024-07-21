import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state) => state.profile)
    const {totalItems} = useSelector( (state) => state.cart)

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 w-full'>
        <div className='w-11/12 flex max-w-maxContent justify-between items-center'>
            {/* Logo  */}
            <Link to={"/"}>
                <img src={logo} alt="StudyNotion Logo" width={160} height={42} loading='lazy'/>
            </Link>

            {/* Nav Links  */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25 items-center'>
                    {
                        NavbarLinks.map((link,index) => {
                            return (
                                <li className='' key={index}>
                                    {
                                        link.title === "Catalog" ? 
                                            (
                                                <Link>
                                                    
                                                </Link>
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

            <div className='flex gap-x-4 items-center'>

            </div>

        </div>
    </div>
  )
}

export default Navbar