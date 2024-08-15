import React, { useEffect, useState } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operations/pageAndComponentDataAPI';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import CatalogCourseCard from '../components/core/Catalog/CatalogCourseCard';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    const getCategory = async() => {
        const result = await apiConnector("GET",categories.CATEGORIES_API);
        const category_id = result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
        setCategoryId(category_id);
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
        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])

  return (
    <div className='flex flex-col w-full mt-14 text-white'>

        {/* Category Descritpion  */}
        <div className='bg-richblack-800 text-white'>
            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row justify-between py-12 gap-y-4'>
                <div className='flex flex-col gap-3 w-[100%] md:w-[80%]'>
                    <div className='flex items-center gap-1 text-richblack-300'>
                        <p>Home / Catalog / </p> <span className='text-yellow-25'>{catalogPageData?.selectedCategory?.name}</span>
                    </div>
                    <p className='text-3xl'>{catalogPageData?.selectedCategory?.name}</p>
                    <p>{catalogPageData?.selectedCategory?.description}</p>
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
                    <CourseSlider courses={catalogPageData?.selectedCategory?.courses}/>
                </div>

                {/* Section-2  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl'>Top Courses in {catalogPageData?.differentCategory?.name}</p>
                    <CourseSlider courses={catalogPageData?.differentCategory?.courses}/>
                </div>

                {/* Scetion-3  */}
                <div className='flex flex-col gap-4'>
                    <p className='text-3xl'>Frequently bought</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 '>
                        {
                            catalogPageData?.mostSellingCourses?.slice(0,4)?.map((course) => (
                                <div key={course._id}>
                                    <CatalogCourseCard course={course} height="h-[230px] md:h-[300px]"/>
                                </div>
                            ))
                        }
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Catalog