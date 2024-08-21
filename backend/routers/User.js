import express from 'express';
import {getUserInfor, getUserList, registerUser, loginUser} from '../controllers/User.js'
const router =  express.Router();

// URL /user/list -- return all the user object
router.get('/user/list', getUserList);
// URL /user/:id -- return user information
router.get('/user/:id', getUserInfor);
// URL /user/api/register -- post form user register
router.post('/user/register', registerUser);
// URL /user/api/login -- post form user login
router.post('/user/login', loginUser);

export default router;