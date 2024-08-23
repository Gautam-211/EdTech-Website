const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require('../models/User');
const crypto = require("crypto")
const CourseProgress = require("../models/CourseProgress")
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
require("dotenv").config();


exports.capturePayment = async(req,res) => {
    
        //get courseID and userID
        const {courses} = req.body;
        const userId = req.user.id;

        //peform validation
        if (courses.length === 0){
            return res.status(401).json({
                success:false,
                message:"No Courses are added in the cart"
            })
        }

        let totalAmount = 0;

        for (const course_id of courses){
            let course;
            try {
                course = await Course.findById(course_id);
                if(!course){
                    return res.status(400).json({
                        success:false,
                        message:"Could not find the course"
                    })
                }

                // const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(userId)){
                    return res.status(400).json({
                        success:false,
                        message:`You have already purchased the course with courseId ${course_id}`
                    })
                }

                totalAmount += course.price;
                
            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:"Internal server error",
                    error:error.message
                })
            }
        }

        // create order
        const options= {
            amount : totalAmount*100,  //multiplied by 100 because the actual amount comes after this multiplication
            currency:"INR",
            receipt : Math.random(Date.now()).toString(),
        }

        try {
            //initiate the payment
            const paymentResponse = await instance.orders.create(options);

            return res.status(200).json({
                success:true,
                data:paymentResponse
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"error in initiating payment",
                error:error.message
            })
        }

}

exports.verifyPayment = async(req,res) => {
    try {

        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const courses = req.body?.courses;
        const userId = req.user.id

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !courses ||
            !userId
          ) {
            return res.status(200).json({ success: false, message: "Payment Failed" })
          }
        
          let body = razorpay_order_id + "|" + razorpay_payment_id;

          const expectedSignature = crypto
                                        .createHmac("sha256",process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex");

          if(expectedSignature === razorpay_signature){

            await enrollStudents(courses, userId, res);

            return res.status(200).json({
                success:true,
                message:"Courses in the cart purchased successfully"
            })
          }
          else{
            return res.status(400).json({
                success:false,
                message:"Signature does not match"
            })
          }
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Internal server error",
            error:error.message
        })     
    }
}

exports.sendPaymentSuccessEmail = async(req,res) => {
    try {
        const {orderId, paymentId, amount} = req.body;
        const userId = req.user.id;

        if(!orderId || !paymentId || !amount || !userId){
            return res.status(400).json({
                success:false,
                message:"Provide complete details"
            })
        }

        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.email, "Payment Received",paymentSuccessEmail(
                                                                        `${enrolledStudent.firstName}`,
                                                                        amount/100,
                                                                        orderId,
                                                                        paymentId
                                                                    ))

        return res.status(200).json({
            success:true,
            message:"Payment success email sent to the student"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}


const enrollStudents = async(courses, userId, res) => {
    try {
        if(!courses || !userId ){
            return res.status(400).json({
                success:false,
                message:"Data of courses or userId not available"
            })
        }

        for (const courseId of courses){
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
                $push:{studentsEnrolled : userId}
            },{new:true});

            if(!enrolledCourse){
                return res.status(400).json({
                    succces:false,
                    message:"Could not find the course with id"+courseId
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
              })

            const enrolledStudent = await User.findByIdAndUpdate(userId,{
                $push:{courses : courseId , courseProgress : courseProgress._id}
            },{new:true});

            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                enrolledCourse.courseName,
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )
        }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}

// exports.capturePayment = async(req,res) => {
//     try {
//         //get courseID and userID
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         //peform validation
//         if (!courseId || !userId){
//             return res.status(401).json({
//                 success:false,
//                 message:"Either of the courseId or userId is not available"
//             })
//         }

//         //course exists
//         const course = await Course.findById(courseId);
//         if (!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"The course does not exist"
//             })
//         }

//         //has user already purchased this course
//         const uid = mongoose.Schema.Types.ObjectId(userId);

//         if (course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"You have already purchased this course before"
//             })
//         }

//         //create order
//         const amount = course.price;
//         const currency = "INR"

//         const options= {
//             amount : amount*100,  //multiplied by 100 because the actual amount comes after this multiplication
//             currency,
//             receipt : Date.now().toString(),
//             notes:{
//                 courseId,
//                 userId
//             }
//         }

//         try {
//             //initiate the payment
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success:true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             })
            
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:"error in initiating payment",
//                 error:error.message
//             })
//         }

//         //return response
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             error:error.message,
//             message:"internal server error"
//         })
//     }
// }


//verify the signature of Razorpay and server

// exports.verifySignature = async(req,res) => {
//     try {
//         //get server secret
//         const webhookSecret = '12345678';

//         //get the secret from reazorpay
//         const signature = req.header["x-razorpay-signature"]  //razorpay sends this secret encrypted

//         //since the request fetched from razorpay is encrypted it and there is not way to decrypt it back, so we use the exact same method
//         //that the razorpay used to encrypt secret to encrypt the secret stored on server
//         //Step-1
//         const shasum = crypto.createHmac("sha256",webhookSecret); // hash based message authentication code
//         //Step-2
//         shasum.update(JSON.stringify(req.body))
//         //Step -3
//         const digest = shasum.digest("hex");

//         //now the secret on server is hashed and can be compared to secret sent by razorpay
//         if(signature === digest){
//             console.log("payment is authorized");

//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             const enrolledUser = await User.findByIdAndUpdate(userId,{
//                 $push:{
//                     courses:courseId
//                 }
//             },{new:true})

//             if (!enrolledUser){
//                 return res.status(500).json({
//                     success:false,
//                     message:"User not found"
//                 })
//             }

//             const enrolledCourse = await Course.findByIdAndUpdate(courseId,{
//                 $push:{
//                     studentsEnrolled:userId
//                 }
//             },{new:true})

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:'course not found'
//                 })
//             }

//             //send mail response
//             const emailResponse = await mailSender(
//                 enrolledUser.email,
//                 "Congratulations for your successfull enrollment in the Course",
//                 courseEnrollmentEmail(enrolledCourse.courseName, enrolledUser.firstName)
//             )

//             return res.status(200).json({
//                 success:true,
//                 message:"Course purchase completed successfully"
//             })
//         }

//         else{
//             return res.status(500).json({
//                 success:false,
//                 message:"Payment transaction was not successfull"
//             })
//         }
        
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({
//             message:"Internal server error",
//             error:error.message
//         })     
//     }
// }