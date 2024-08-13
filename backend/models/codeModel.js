import mongoose from "mongoose";

const inputSchema = new mongoose.Schema({
    label: { type: String },
    value: { type: String } 
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
    inputs: [inputSchema],
    output: { type: String }
}, { _id: false });

const codeSchema = new mongoose.Schema({
     codeData:{
        problemName: { type: String },
        problemType: { type: String },
        problemDiffcuilty: { type: String },
        avgTime: { type: Number},
        problemDesscription: { type: String },
        image: { type: String},
        testCases: [testCaseSchema],
        submitted:{
            type:Number,
            default:0
        },
        correctSubmissions:{
            type:Number,
            default:0
        },
        acceptanceRate:{
            type:Number,
            default:0
        }
     }
});

const codeModel = mongoose.model('Code', codeSchema);

export default codeModel;
