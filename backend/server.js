import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { codeStore } from './router/codestorerouter.js';
import { runCode } from './router/Runproblemrouter.js';
import bodyParser from 'body-parser';
import { authrouter } from './router/authrouter.js';
import { contestRouter } from './router/contestRouter.js';

const app=express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
dotenv.config();

mongoose.connect(process.env.MONGO_URL)// connect the mongodb 
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


app.use('/api/store',codeStore)
app.use('/api',codeStore)
app.use('/api/delete',codeStore)
app.use('/api',runCode)
app.use('/api',authrouter)
app.use('/api',contestRouter)






app.listen(4000,()=>{
    console.log('ponnana')
})