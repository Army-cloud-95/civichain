import { asyncHandler } from "../utils/errorHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Vote } from "../models/votes.model.js";
import { Issue } from "../models/issue.model.js";


const postvote = asyncHandler(async(req,res) => {
    const issueId = req.params.issueId;
    const userId = req.user._id;
    const existingVote= await Vote.findOne({userId, issueId});
    if(existingVote){
        throw new ApiError(400, "Already voted");
    }
    const issue = await Issue.findOne({ issueId, progress:"Pending"});
    if(!issue){
        throw new ApiError(404, "Issue not found or either in progress");
    }
    const voteData = {
        userId: userId.toString(),
        issueId,
        
        
    };
    

})

export { postvote};
