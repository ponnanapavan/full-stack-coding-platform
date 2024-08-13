import mongoose from 'mongoose'
const inputSchema = new mongoose.Schema({
    label: { type: String },
    value: { type: String } 
}, { _id: false });

const testCaseSchema = new mongoose.Schema({
    inputs: [inputSchema],
    output: { type: String }
}, { _id: false });
const contestSchema=new mongoose.Schema({
    contestName: { type: String, unique: true },
    startDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true },   
    contest:[
        {
            problemName:{type:String},
            problemType:{type:String},
            problemDesscription:{type:String},
            problemDiffcuilty:{type:String},
            image:{type:String},
            problemSubmissions:{type:Number,default:0},
            testCases:[testCaseSchema],
            correctSubmissions:{type:Number, default:0},
            acceptenceRate:{type:Number, default:0},
            avgTime:{type:Number, default:0},
            problemScore:{type:Number,default:0},
        }
    ]
})

contestSchema.methods.incrementSubmissions = async function (problemName) {// here i adding some own method   incrementSubmissions to contestsSchema  so we can use method
    // Find the problem within the contest array
    const problem = this.contest.find(p => p.problemName === problemName);// this will refers to  current object i.e current object and give particular docuemtn based on problemName
    if (problem) {

        problem.problemSubmissions += 1;
        // Save the updated contest document
        await this.save();
        // Return the new submission count
        return problem.problemSubmissions;
    } else {
        throw new Error('Problem not found');
    }
};// here i used methods because it is a particular document 

contestSchema.methods.correctSubmissions = async function (problemName) {
    try {
        const problem = this.contest.find(p => p.problemName === problemName);
        if (!problem) {
            console.error(`Problem with name ${problemName} not found`);
            throw new Error('Problem not found');
        }

      
        problem.correctSubmissions += 1;

        const totalSubmissions = problem.problemSubmissions;
    
        const correctSubmissions = problem.correctSubmissions;

        
        if (totalSubmissions>0) {
            problem.acceptenceRate = ((correctSubmissions / totalSubmissions) * 100).toFixed(1);
        } else {
            problem.acceptanceRate = 0; // Or handle as per your requirement
        }

        await this.save();

      
        return problem.acceptanceRate;

    } catch (error) {
        // Log and throw the error for further handling
        console.error('Error updating submissions:', error.message);
        throw error; // or handle as needed
    }
};




const contestModel=new mongoose.model('contest',contestSchema);

export default contestModel