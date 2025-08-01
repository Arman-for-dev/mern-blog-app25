import mongoose from "mongoose";



const connectDB = async () =>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected`)
    } catch (error) {
        process.exit(1);
    }
}

export default connectDB;