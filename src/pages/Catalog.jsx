import React, { useEffect, useState } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operations/pageAndComponentDataAPI';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    const getCategory = async() => {
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        const category_id = result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setCategoryId(category_id);
        console.log(category_id)
    }

    const getCategoryDetails = async() => {
        const result = await getCatalogPageData(categoryId);
        if(result){
            setCatalogPageData(result);
        }
    }

    useEffect(() => {
        getCategory();
    },[catalogName])

    useEffect(() => {
        if(categoryId !== ""){
            getCategoryDetails();
        }
    },[categoryId])

  return (
    <div className='flex flex-col w-full mt-14 text-white'>

        {/* Category Descritpion  */}
        <div className='bg-richblack-800 text-white'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row justify-between py-12 gap-y-4'>
                <div className='flex flex-col gap-3 w-[100%] md:w-[60%]'>
                    <p>home/catalog/pyton</p>
                    <p className='text-3xl'>Python</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, nisi? Quaerat necessitatibus porro quas mollitia molestiae facilis quo, repellat est facere architecto dolore. Dicta dolorem accusamus est, commodi ratione reprehenderit perferendis eos, ab aperiam doloribus sequi corrupti maiores eligendi! Excepturi repudiandae, assumenda nam necessitatibus provident officia tenetur minus. Corporis, minus.</p>
                </div>

                <div className='md:pr-16 flex flex-col md:gap-2'>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>

        <div className='max-w-maxContent mx-auto w-11/12 pt-16 flex flex-col gap-16'>
        {        /* Scetion-1  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl'>Courses to get you started</p>
                    <div className='flex gap-4 border-b-[1px] border-richblack-600 pb-2'>
                        <p className='pl-2'>Most Popular</p>
                        <p>New</p>
                    </div>
                    <CourseSlider/>
                </div>

                {/* Section-2  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl'>Top Courses</p>
                    <CourseSlider/>
                </div>

                {/* Scetion-3  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl'>Frequently bought together</p>
                </div>
        </div>
    </div>
  )
}

export default Catalog