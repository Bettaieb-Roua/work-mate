import Role from '../models/Role.js';
import { CreateError } from '../utils/error.js';
import { CreateSuccess } from '../utils/success.js';

export const createRole = async (req,res,next)=>{
    try {
        if(req.body.role && req.body.role !== '') {
            const newRole = new Role({
                role: req.body.role, 
            });
            await newRole.save();
            return next(CreateSuccess(200,"Role created!"));
        }
        else{
            return next(CreateError(400,"Bad Request"));
        }
        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));

        
    }

}
export const updateRole = async (req,res,next)=>{
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set : req.body},
                {new:true}
            );
            return next(CreateSuccess(200,"Role updated!"));
        }
        else {
            return next(CreateError(404,"Role Not found!"));

        }
    } catch (error) {
       
        return next(CreateError(500,"Internal Server Error"));    
    }
}

export const getAllRoles = async (req,res,next) =>{
    try {
        const roles = await Role.find();
        return next(CreateSuccess(200,"Roles sent!",roles));

        
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   
    }
}

export const deleteRole = async (req,res,next) =>{
    try {
        const roleId = req.params.id;
        const role = await Role.findById({_id:roleId});
        if(role){
            await Role.findByIdAndDelete(roleId)
            return next(CreateSuccess(200,"Role deleted!"));
        }
        else{
        
            return next(CreateError(404,"Role Not found!"));
        }

        }
    catch (error) {
        return next(CreateError(500,"Internal Server Error"));
   }
}
