import express from 'express';
import {getCommentsOfPhoto, addNewComment} from '../controllers/Comment.js';
const router = express.Router();

// URL /commentsOfPhoto/:photoId -- Return the comments of each photo for user
router.get('/commentsOfPhoto/:photoId', getCommentsOfPhoto);

// URL /addComment -- Post comment
router.post('/addComment', addNewComment)

export default router;