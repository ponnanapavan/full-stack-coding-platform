import express from 'express'
import { getSubmissionsData, login, signup } from '../controller/userauthcobtroller.js';

const router=express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.get('/getSubmissions/:userId',getSubmissionsData)

export {router as authrouter};