import React from 'react';
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link,iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

  return (
    <NavLink to={link.path}
        className={`relative px-8 py-2 text-lg hover:text-white transition-all duration-200 ease-linear
        ${matchRoute(link.path)?"bg-yellow-25 bg-opacity-25 text-yellow-50":"bg-opacity-0 text-richblack-300"}`}>

            <span className={`absolute left-0 top-0 w-[0.2rem] h-full 
                ${matchRoute(link.path)?"bg-yellow-50":"bg-opacity-0"}`}>
            </span>

            <div className='flex items-center gap-x-3'>
                <Icon />
                {link.name}
            </div>

    </NavLink>
  )
}

export default SidebarLink