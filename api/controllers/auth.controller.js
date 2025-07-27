import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) =>{
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password || username === " " || email === " " || password === " " ){
          next(errorHandler(400, 'All field are required!'))
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);


        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log({user})

        res.status(201).json({message:"User create successfully"})

    } catch (error) {
        next(error);
    }
}