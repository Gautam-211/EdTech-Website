import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";


export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId});

        console.log("CATALOG PAGE DATA API RESPONSE ...", response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }

        toast.success("Data fetched successfully");
        result = response?.data?.data
        
    } catch (error) { 
        console.log("CATALOG PAGE DATA API RESPONSE...",error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}