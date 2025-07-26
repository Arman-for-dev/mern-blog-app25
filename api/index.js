import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});