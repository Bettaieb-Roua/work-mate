import express from 'express';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
const router = express.Router();


// create a new role in DB

router.post('/create', createRole);

// Update Role in DB
router.put('/update/:id',updateRole);

// get all roles from db
router.get('/getAll', getAllRoles)


//delet Role in DB 
router.delete('/delete/:id',deleteRole);

//export
export default router;