import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
const signup = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    const existUser = await userModel.findOne({ username });
    if (existUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);//it will some string
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      username,
      name,
      email,
      password:hashedPassword
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default signup;

const login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const checkUser = await userModel.findOne({ username });
    if (!checkUser) {
      return res.status(400).json({ error: 'Username does not exist' });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({ error: 'Password is wrong' });
    }
    return res.status(200).json({ success: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



const getSubmissionsData=async(req,res)=>{
  const {userId}=req.params;
 
  try{
          const submissionsData=await userModel.findById(userId).populate({
            path:'submissions.problemId',
            select:'codeData.problemName  codeData.problemDiffcuilty  codeData.submitted codeData.acceptanceRate'
          });
          if(!submissionsData){
            res.status(400).json({error:'you not submitted any code'});
            return;
          }
          res.status(200).json(submissionsData);
  }catch(err)
  {
     res.status(500).json({error:err.message})
  }

}

export {signup,login,getSubmissionsData}