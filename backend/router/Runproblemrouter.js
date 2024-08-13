import express from 'express';
import { contestSubmitCode, submitCode } from '../controller/runcodecontroller.js';

const router=express.Router();


router.post('/submitCode/:id',submitCode)

router.post('/contestSubmitCode',contestSubmitCode)




export {router as runCode}