import codeModel from "../models/codeModel.js";

async function storeCode(req,res){
    try{
           const {updatedData}=req.body;
           console.log(updatedData)
        
           const newProblem=new codeModel({
               codeData:updatedData
           })
              await newProblem.save();
              res.status(200).json(newProblem);
    }catch(err){
          res.status(500).json({error:err.message});

    }

}

async function deleteCode(req,res){
    const {id}=req.params;
    console.log(id)
    try{
        const deletedCode = await codeModel.findByIdAndDelete(id);    
            if (!deleteCode) {
            return res.status(404).json({ message: 'Code not found' });
          }
          const remainingCodes = await codeModel.find({});
          res.status(200).json(remainingCodes);
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

async function updateCode(req,res){
    try{
           const {id}=req.params;
           const {data}=req.body;
           if(!data)
           {
            res.status(400).json({error:'Code is not present to update' });
            return;
           }
              const updatedProblem = await codeModel.findOneAndUpdate(
            { _id:id },
            { codeData: data }, 
            { new: true, upsert: true } 
        );  
               res.status(200).json({updateCode});
    }catch(err){
        res.status(500).json({ error:err.message });
    }
}

async function getProblems(req, res) {
    try {
        const Problems = await codeModel.find();

        if (Problems.length === 0) {
            return res.status(404).json({ error: 'No problems found' });
        }
           console.log(Problems)

        res.status(200).json(Problems);
    } catch (err) {
        console.error("Error in getProblems:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getProblem(req,res){
    const {id}=req.params;
try{
    const problem=await codeModel.findById(id);
    if(!problem)
    {
        res.status(400).json({error:'problem is not present'})
        return ;
    }
        res.status(200).json(problem);


}catch(err){
    res.status(500).json({error:err.message})
}

}



export {storeCode,deleteCode,updateCode, getProblems, getProblem};