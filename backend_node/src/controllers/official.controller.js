import { asyncHandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Official } from "../models/official.model.js";
import { Invite } from "../models/invite.model.js";

function generateOfficialId(token) {
    const Id = token.toString().substring(0, 5);
    const IdCreated = `OFF${Id}`;
    return IdCreated;
}

const registerOfficial = asyncHandler(async (req, res) => {

    console.log(req.inviteData);
    const { name, password, email, phone, regionAssigned } = req.body;
    const { inviteData } = req;
    if (
        [phone, name, email, regionAssigned, password].some(
            (field) => !field || field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Invalid Credentials");
    }
    if (!email === inviteData.email || !name === inviteData.name) {
        throw new ApiError(400, "Email and name cannot be changed");
    }
    const official = await Official.create({
        name: inviteData.name,
        email: inviteData.email,
        userName: generateOfficialId(inviteData.token),
        regionAssigned,
        phone,
        password,
    });
    const officialCreated = await Official.findById(official._id).select(
        "-password -refreshToken"
    );
    if (!officialCreated) {
        throw new ApiError(500, "Something went wrong");
    }
    const invite = await Invite.findOne({email});
     await Invite.findByIdAndUpdate(invite._id,{ status:"completed"});

    return res.status(201).json(new ApiResponse(200, officialCreated, "Official Registered","/dashboard"));
});

const getOffIssues = asyncHandler(async(req,res) => {
    const { regionAssigned } = req.user.regionAssigned;
    if(!regionAssigned){
        throw new ApiError(404,"Region assigned not found");
    }

})

export { registerOfficial, getOffIssues };
