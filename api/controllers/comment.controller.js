import Comment from '../models/Comment.js';
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

// create comment
export const createComment = async (req,res,next)=>{
    try {
        if(req.body.comment && req.body.comment !== '') {
            const newComment = new Comment({
                comment: req.body.comment, 
                
            });
            await newComment.save();
            return next(CreateSuccess(200,"comment created!",newComment));
        }
        else{
            return next(CreateError(400,"Bad Request"));
        }
        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));

        
    }

}

// get all comments
export const getAllComments = async (req,res,next) =>{
    try {
        const taskId = req.params.taskId; 
        const comments = await Comment.find({ taskId: taskId });
        return next(CreateSuccess(200,"list of all comments :",comments));

        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   
    }
}