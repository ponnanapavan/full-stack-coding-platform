import contestScoreModel from "../models/contestscoreModel.js";
import contestModel from "../models/contestsModel.js";

const storeContestCode = async (req, res) => {
    const { contest } = req.body;
    console.log(contest)
    const contestName = contest.contestName;
    try {
        let existingContest = await contestModel.findOne({ contestName: contestName });

        if (existingContest) {
            // Contest name exists, push the new contest data
            await contestModel.updateOne(
                { contestName: contestName },
                { $push: { contest: contest } }
            );
            res.status(200).json({ message: 'Contest updated successfully' });
        } else {
           
            const newContest = new contestModel({
                contestName: contestName,
                startDate:contest.startDate,
                endDate:contest.endDate,
                contest:contest,
            });
            await newContest.save();
            res.status(200).json({ message: 'Contest created successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const allContestCodes=async(req,res)=>{
    try{
           const allContestCodes=await contestModel.find();
           if(!allContestCodes)
            return res.status(400).json({error:'contests not present'})
        res.status(200).json(allContestCodes);

    }catch(err){
        res.status(500).json({error:err.message});

    }
}


const getContestCodes=async(req,res)=>{
   const {contestName}=req.params;
    try{
           const contestCodes=await contestModel.findOne({contestName});
           if(!contestCodes)
            return res.status(400).json({error:'contest not present'})
          res.status(200).json(contestCodes);

    }catch(err){
        res.status(500).json({error:err.message})
    }

}

// const postContestScore=async(req,res)=>{
//    try{
//     const {contestName,userId,problemScore}=req.body;
//     const findContest=await contestScoreModel.findOneAndUpdate(
//         {
//                contestName:contestName,
//                'contestSubmissions.userData':mongoose.Types.ObjectId(userId)
//         },
//         {
//             $inc: { 'contestSubmissions.$.contestScore': problemScore }
//         },
//         {
//             new:true
//         }
// )
//     if(!findContest){
//         const newContestScore=new contestScoreModel({
//             contestName,
//             contestSubmissions:[
//                 {
//                     userData:mongoose.Types.ObjectId(userId),
//                     contestScore:problemScore
//                 }
//             ]
//         })
//             await newContestScore.save();
//     }
//     res.status(200).send('Score updated or added successfully.');

//    }catch(err){
//     res.status(500).send('Error updating or adding score: ' + error.message);

//    }
    

// }

const getParticaptesContestScore=async(req,res)=>{
    const {contestName}=req.params;
    try{
        const contestScores = await contestScoreModel.find({ contestId: contestName })
        .populate('contestSubmissions.userData', 'username').sort({ 'contestSubmissions.contestScore': -1 });
        if (contestScores.length === 0) {
            return res.status(404).json({ message: 'No contests found' });
        }
            res.status(200).json(contestScores)

    }catch(err){
         res.status(500).json({error:err.message})
    }

}
export { storeContestCode,allContestCodes,getContestCodes,getParticaptesContestScore};
