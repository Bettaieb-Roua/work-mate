import express from 'express';
import { createComment, getAllComments } from '../controllers/comment.controller.js';
const router = express.Router();


//create comment
router.post('/createComment', createComment);

// get all comments
router.get('/getAllComments/:taskId', getAllComments)




//export
export default router;