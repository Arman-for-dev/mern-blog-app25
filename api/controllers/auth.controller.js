import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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

export const signIn  = async (req, res, next) =>{
    const {email, password} = req.body;

    if( !email || !password || email === " " || password === " " ){
        next(errorHandler(400, 'All field are required!'))
    }

    try {
        const validUser = await User.findOne({email});

        if(!validUser){
            next(errorHandler(400, 'User not found!'));
        }

        const isPasswordValid = await bcrypt.compareSync(password, validUser.password);
        if(!isPasswordValid){
           return next(errorHandler(400, 'Invalid password!'));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET,{
            expiresIn: '7d'
        });

        const {password: pass, ...rest} = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);



    } catch (error) {
        
    }
}