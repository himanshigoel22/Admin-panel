const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL;


const connectDb = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB Connected");
    } 
    catch (error) {
        console.error(' DB connection failed');
        process.exit(0);
    }
}

module.exports = connectDb;