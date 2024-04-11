import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/task.controller.js';


const router = express.Router();

//create task
router.post('/create', createTask);

// get all tasks
router.get('/getAllTasks',getAllTasks)

// update task
router.put('/update/:id',updateTask);

//delete task
router.delete('/delete/:id',deleteTask);

//export
export default router;