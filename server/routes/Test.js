const express = require("express");
const router = express.Router();

const { addCourse} = require("../controller/Test")


router.post("/addCourse",addCourse);

module.exports = router;