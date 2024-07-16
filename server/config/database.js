const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {console.log("DB connection was successful")})
        .catch((err) => {
            console.log(err);
            console.log("DB connection problem");
            process.exit(1);
        })
}

module.exports = dbConnect;