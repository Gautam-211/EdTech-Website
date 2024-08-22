import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import {Pie} from 'react-chartjs-2';

Chart.register(...registerables)

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            colors.push(color);
        }
        return colors;
    }

    const chartDataForStudents = {
        labels:courses?.map((course => course?.courseName)),
        datasets:[
            {
                data:courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor:getRandomColors(courses.length)
            }
        ]
    }

    const chartDataForIncome = {
        labels:courses?.map((course => course?.courseName)),
        datasets:[
            {
                data:courses.map((course) => course.totalAmountGenerated),
                backgroundColor:getRandomColors(courses.length)
            }
        ]
    }

    const options = {

    }

  return (
    <div className='bg-richblack-800 px-3 py-5 rounded-lg w-full'>
        <h1 className='text-xl font-semibold'>Visualize</h1>
        <div className='flex items-center gap-3 mt-2 w-full mb-2'>
            <button onClick={() => setCurrChart("students")}
                className={`${currChart==="students"?"bg-richblack-700":"text-opacity-70"} px-2 py-1 rounded-md transition-all
                duration-200 ease-linear text-yellow-50`}>
                Students
            </button>
            <button onClick={() => setCurrChart("income")}
                className={`${currChart!=="students"?"bg-richblack-700":"text-opacity-70"} px-2 py-1 rounded-md transition-all
                duration-200 ease-linear text-yellow-50`}>
                Income
            </button>
        </div>
        <div className='md:w-[60%] flex flex-col items-center mx-auto'>
            <Pie data={currChart==="students"?chartDataForStudents:chartDataForIncome}
            options={options} />
        </div>
    </div>
  )
}

export default InstructorChart