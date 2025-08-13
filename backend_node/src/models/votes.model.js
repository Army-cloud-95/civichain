import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  transitionId:{type:String, required:true},
  voteType:{type:String,default:"upvote"},
  verified:{type:Boolean, required:true, default:false},
  voteId:{type:String,},
},{timestamps:true})

export const Vote = mongoose.model("Vote",VoteSchema);
