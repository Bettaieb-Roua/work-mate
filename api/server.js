import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import taskRoute from './routes/task.js';
import CommentRoute from './routes/comment.js';

import cors from 'cors'; 
 

const app = express();
dotenv.config();
app.use(cors());

// DB connection:
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DataBase!")
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(express.json());
app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/task",taskRoute);
app.use("/api/comment",CommentRoute);
//response Handle Middleware
app.use((obj, req,res,next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message || 'Internal Server Error! ';
    return res.status(statusCode).json({
        success:[ 200,201,204].some(a => a===obj.status) ? true : false,
        status: statusCode,
        message: message,
        data:obj.data
    });

}
 ); 




//run server
app.listen(3000, () => {
    connectMongoDB().catch((error) => {
        console.error(error);
        process.exit(1); // Quit the process if there is an error connecting to the database
    });
    console.log('Server running on port 3000');
});
