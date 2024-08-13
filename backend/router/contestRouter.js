import express from 'express'
import { allContestCodes, getContestCodes, getParticaptesContestScore, storeContestCode } from '../controller/contestcontroller.js';

const router=express.Router();


router.post('/storeContestCode',storeContestCode)
router.get('/getContestCodes',allContestCodes)
router.get('/getContestCodes/:contestName',getContestCodes)
router.get('/getContestScore/:contestName',getParticaptesContestScore)


export {router as contestRouter}