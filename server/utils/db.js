const mongoose= require("mongoose");

const URI = process.env.MONGODB_URI

const connectedDb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("Database connect successfully")
    } catch (error) {
        console.error("Database connection failed:",error);
        process.exit(0)
    }
}

module.exports=connectedDb;