import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
// signup
export const signup = async (req,res,next)=>{
    const role = await Role.find({role:'User'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User ({
       firstName:req.body.firstName,
       lastName:req.body.lastName,
       username: req.body.username,
       email:req.body.email,
       password:hashPassword,
       confirmPassword:hashPassword,
       roles:role, 
    });
    await newUser.save();
    return next(CreateSuccess(200,"User Signed Up successfully!"));
}
// get all signed up  users 
export const getAllUsers = async (req,res,next) =>{
    try {
        const users = await User.find();
        return next(CreateSuccess(200,"list of all signed up users :",users));

        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   
    }
}

// login
export const login = async (req, res,next) =>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return next(CreateError(404,"User Not Signed Up!"));

        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect){
            return next(CreateError(400,"Password is incorrect!"));

        }

        return next(CreateSuccess(200,"User logged in successfully!",user));

        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));

    }


}