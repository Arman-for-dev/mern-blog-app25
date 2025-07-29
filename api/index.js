import express from "express";
import "dotenv/config";
import cors from 'cors';
import morgan from 'morgan'

import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";


const app = express();
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});

//routes
app.use('/api/auth', authRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});