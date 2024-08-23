import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async(token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        //initiate the order 
        const orderResponse = await apiConnector("POST", studentEndpoints.COURSE_PAYMENT_API,
                                                        {courses},
                                                        {
                                                            Authorization : `Bearer ${token}` 
                                                        })
        
        if(!orderResponse.data.success){
            throw new Error(orderResponse?.data?.message);
        }

        console.log("order response for course",orderResponse)

        //create options 
        const options = {
            key:process.env.RAZORPAY_KEY,
            currency : orderResponse.data.data.currency,
            amount : `${orderResponse.data.data.amount}`,
            order_id : orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the course",
            image: rzpLogo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler: function (response){
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)

                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Oops! Payment failed");
            console.log(response.error);
        })

    } catch (error) {
        console.log("PAYMENT API RESPONSE", error);
        toast.error("Could not make the payment");
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try {
        await apiConnector("POST", studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },{
            Authorization : `Bearer ${token}`
        })

    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL API ERROR... ", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment ...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", studentEndpoints.COURSE_VERIFY_API, bodyData, {
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.log("PAYMENT VERIFY API ERROR...", error);
        toast.error("Could not verify the payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}