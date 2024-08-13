import mongoose from 'mongoose'

const contestScoreSchema=new mongoose.Schema({
    contestId:{
         type:String
    },
    contestSubmissions:[
        {
            userData:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'

            },
            contestScore:{
                type:Number,
                default:0
            }

        }
    ]
})//create a contestScoreSchema model  which is used to store the userSubmissions (total score of contest of particular user )

contestScoreSchema.statics.updateOrAddContestScore = async function (contestName, userId, problemScore) {//this is a user defained method 
    
    try {
        const result = await this.findOneAndUpdate(// here i am checking two conditions. and this is pointing to the current model
            {
              contestId: contestName,
                'contestSubmissions.userData': new mongoose.Types.ObjectId(userId)  
            },
            {
                $inc: { 'contestSubmissions.$.contestScore': problemScore }
            },
            {
                  new:true
            }
            
        );
            

        if (!result) {// if condition not satisfied then i will create a new document
            const newContestScore = new this({
               contestId: contestName,
                contestSubmissions: [
                    {
                        userData:new mongoose.Types.ObjectId(userId),
                        contestScore: problemScore
                    }
                ]
            });
            await newContestScore.save();
        }

        return 'Score updated or added successfully.';
    } catch (error) {
        throw new Error('Error updating or adding score: ' + error.message);
    }
};

const contestScoreModel=mongoose.model('contestScore',contestScoreSchema);

export default contestScoreModel