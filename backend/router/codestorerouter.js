import express from 'express'
import { deleteCode, getProblem, getProblems, storeCode, updateCode } from '../controller/storecodecontroller.js';
const router=express.Router();


router.post('/codeStore',storeCode);

router.delete('/deleteCode/:id',deleteCode)

router.patch('/UpdateProblem/:id',updateCode)

router.get('/getProblems',getProblems)

router.get('/getProblem/:id',getProblem)


export {router as codeStore};

