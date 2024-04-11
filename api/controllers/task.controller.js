import Task from "../models/Task.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// add task
export const createTask = async (req,res,next)=>{
    try {
        const { title, description, due_date, status, category, priority, files, assigned_to } = req.body;
        if(title && description && due_date && status && category && priority && files ) {
            const newTask = new Task({
                title,
                description,
                due_date,
                status,
                category,
                priority,
                files,
                assigned_to, 
            });
            await newTask.save();
            return next(CreateSuccess(200,"Task created!"));
        }
        else{
            // console.log(newTask);
            return next(CreateError(400,"Bad Request"));
        }
        
    } catch (error) {
        console.log(error)
        return next(CreateError(500,"Internal Server Error"));

        
    }

}
//get all tasks
export const getAllTasks = async (req,res,next) =>{
    try {
        const tasks = await Task.find();
        return next(CreateSuccess(200,"list of all tasks :",tasks));

        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   
    }
}
//update task
export const updateTask = async (req,res,next)=>{
    try {
        const task = await Task.findById({_id: req.params.id});
        if(task){
            const newData = await Task.findByIdAndUpdate(
                req.params.id,
                {$set : req.body},
                {new:true}
            );
            return next(CreateSuccess(200,"Task updated!"));
        }
        else {
            return next(CreateError(404,"Task Not found!"));

        }
    } catch (error) {
       
        return next(CreateError(500,"Internal Server Error"));    
    }
}
// delete task :

export const deleteTask = async (req,res,next) =>{
    try {
        const taskId = req.params.id;
        const task = await Task.findById({_id:taskId});
        if(task){
            await Task.findByIdAndDelete(taskId)
            return next(CreateSuccess(200,"Task deleted!"));
        }
        else{
        
            return next(CreateError(404,"Task Not found!"));
        }

        }
    catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   }
}