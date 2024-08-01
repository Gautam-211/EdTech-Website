//express
const express = require("express");
const app = express();

//routes 
const userRoutes = require("./routes/User");
// const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/Contact")
const testRoutes = require("./routes/Test")

//config functions
const dbConnect = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");

//node package dependencies
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//env file config
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connection
dbConnect();

//add middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

//cloudinary connect
cloudinaryConnect();

//mounting of routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach",contactUsRoutes)
app.use("/api/v1/test",testRoutes);
// app.use("/api/v1/payment", paymentRoutes);

//default route
app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})

//start the server
app.listen(PORT, () => {
    console.log(`App is running at PORT no. - ${PORT}`)
})