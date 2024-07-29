const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");
const validator = require("validator")

exports.contactUs = async(req,res) => {
    try {
        const {firstName,lastName,email,phoneNo,countrycode,message} = req.body;

        if(!firstName || !email || !phoneNo || !message || !countrycode){
            return res.status(400).json({
                success:false,
                message:"Fill all the required details"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success:false,
                message:"Invalid email Address"
            });
        }

        const phoneNumber = countrycode + "-" + phoneNo;

        const mailResponse = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNumber )
        )

        return res.status(200).json({
            success:true,
            message:"Message sent successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}