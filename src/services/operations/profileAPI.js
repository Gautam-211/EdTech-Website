import toast from "react-hot-toast";
import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";


export async function getUserEnrolledCourses(token){
    
        const toastId = toast.loading("Loading...");
        let result = []

        try {
            const response = await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{ Authorization: `Bearer ${token}` });
            console.log("ENROLLED COURSES API RESPONSE...", response);

            if (!response.data.success){
                throw new Error(response.data.message);
            }

            result = response.data.data;
            
        } catch (error) {
            console.log("ENROLLED COURSES API RESPONSE...",error );
            toast.error("Could not fetch enrolled courses");
        }finally{
            toast.dismiss(toastId);
            return result;
        }
    
}

export const getIntructorDashboardData = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, {
            Authorization : `Bearer ${token}`
        })
        console.log("INSTRUCTOR DATA API response...", response);

        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }

        result = response?.data?.data
        
    } catch (error) {
        toast.error(error.message);
        console.log("INSTRUCTOR DATA API response...", error)
    }

    toast.dismiss(toastId);
    return result;
}