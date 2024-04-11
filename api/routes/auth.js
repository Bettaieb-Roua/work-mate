import express from 'express';
import { getAllUsers, login, signup } from '../controllers/auth.controller.js';

const router = express.Router();

//signup

router.post('/signup', signup );

//login
router.post('/login', login)

//get all users
router.get('/getAllUsers',getAllUsers)
//export
export default router;