import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"


export const fetchCourseCategories = async() => {
    let result =[]
    try {
        const response = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
        console.log("COURSE CATEGORIES API RESPONSE...", response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response?.data?.data
        
    } catch (error) {
        console.log("COURSE CATEGORIES API RESPONSE...",error);
        toast.error(error.message);
    }
    finally{
        return result;
    }
}