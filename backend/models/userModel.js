import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
   
  },
  email: {
    type: String,
    unique: true,
   
  },
  password: {
    type: String,
   
  },
  submissions: [{
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Code',
    },
    success: {
      type: Boolean,
    }
  }],


});

const userModel = mongoose.model('User', userSchema);

export default userModel;
