import { VM } from 'vm2';
import path from 'path';
import { fileURLToPath } from 'url';

// Import starter code from your module
import starterCode from '../utils/starterCode.js'; // Adjust path as needed
import codeModel from '../models/codeModel.js';
import userModel from '../models/userModel.js';
import contestStarterCode from '../utils/conteststartercode.js';
import contestModel from '../models/contestsModel.js';
import contestScoreModel from '../models/contestscoreModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function submitCode(req, res) {
  const { code, language, questionName, userId } = req.body;
  console.log(req.body);
  const { id } = req.params;
  let userCode;
  async function updateUserSubmissions(userId, problemId, success) {// track the submission of user solved problem either it is success or not 
    return  await userModel.findByIdAndUpdate(
      userId,
      { $push: { submissions: { problemId, success } } },// it is pushoperation because submissions is array of objects so here i am pushing object into array
      { new: true }
    );
  }

  // Increment the submitted count
  let updatedCode = await codeModel.findByIdAndUpdate(
    id,
    { $inc: { 'codeData.submitted': 1 } },
    { new: true }
  )

  if (language !== 'javascript') {
    return res.status(400).json({ success: false, error: 'Unsupported language' });
  }
       

  try {
    const questionCode = starterCode[questionName];
    const combinedCode = questionCode.replace('// implemented function', code);// here i am replacing //implemented function with user implemented function
    const output = [];
    const vm = new VM({
      timeout: 10000,
      sandbox: {
        console: {
          log: (...args) => {
            output.push(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
          }
        }
      }
    });
    const result = vm.run(combinedCode);
    let parseOutput;
    try {
      parseOutput = JSON.parse(output.join(''));
    } catch (e) {
      updateUserSubmissions(userId, id, false);
      throw new Error('Error parsing output');
    }
       let flag=true;
    for (let i = 0; i < parseOutput.length; i++) {
      if (parseOutput[i] === false) {
           flag=false;
           break;
      }
    }
       if(!flag){
        updateUserSubmissions(userId, id, false);
          return res.status(401).json({ wrongoutput: "All test cases did not pass, please try again." });
       }
    updatedCode = await codeModel.findByIdAndUpdate(
      id,
      { $inc: { 'codeData.correctSubmissions': 1 } },
      { new: true }
    );

    // Calculate the acceptance rate
    const { submitted, correctSubmissions } = updatedCode.codeData;
    const acceptanceRate = (correctSubmissions / submitted) * 100;

    // Format the acceptance rate to one decimal place
    const formattedAcceptanceRate = acceptanceRate.toFixed(1);// like 33.3333 to 33.3

    // Update the acceptance rate in the database
    updatedCode = await codeModel.findByIdAndUpdate(
      id,
      { 'codeData.acceptanceRate': formattedAcceptanceRate },
      { new: true }
    );
    await updateUserSubmissions(userId, id, true);
    res.json({ success: true, result, output: output.join('\n'), acceptanceRate: formattedAcceptanceRate });
  } catch (err) {
    updateUserSubmissions(userId, id, false);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'An error occurred during code execution.',
        error: err.message || 'Unknown error',
      });
    }
  }
}

async function contestSubmitCode(req, res) {
  const { code, contestName, questionName,problemScore,userId } = req.body;


  try {
    const questionCode = contestStarterCode[questionName];
    
    if (!questionCode) {
      return res.status(400).json({ error: 'Invalid question name' });
    }
    let contest = await contestModel.findOne({ contestName });
   

    if (!contest) {
        return res.status(404).json({ error: 'Contest not found' });
    }

 
    const newSubmissionCount = await contest.incrementSubmissions(questionName);// in i am incrementing the submissions whether code acdepted or wrong
  

    const combinedCode = questionCode.replace('//implemented function', code);
    console.log(combinedCode)
    let output = [];

    const vm = new VM({
      timeout: 10000,
      sandbox: {
        console: {
          log: (...args) => {
            output.push(args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '));
          }
        }
      }
    });
       

    vm.run(combinedCode);// run the js code
    console.log(output)
    let parseOutput;
    try {
      parseOutput = JSON.parse(output.join(''));
    } catch (e) {
      throw new Error('Error parsing output');
    }
       let flag=true;
    for (let i = 0; i < parseOutput.length; i++) {
      if (parseOutput[i] === false) {
           flag=false;
           break;
      }
    }
       if(flag===true){
            await contest.correctSubmissions(questionName);// hanlde submissions and acceptence
            await contestScoreModel.updateOrAddContestScore (contestName,userId,problemScore);// add the score to a particular user for a particular contest
            res.status(200).json({success:true})
       }else{
        res.status(200).json({sucess:false});
       }
   

  } catch (err) {
    res.status(500).json({ error: 'An error occurred while running the code', details: err.message });
  }
}

export { submitCode, contestSubmitCode };
