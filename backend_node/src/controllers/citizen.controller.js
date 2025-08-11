import { asyncHandler } from "../utils/errorHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
// import { getEmailTemplate } from "../utils/emailTemplate.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend
    const { name, userName, email, phone, password } = req.body;

    //validate - not empty
    if (
        [name, userName, email, phone, password].some(
            (field) => !field || field?.trim() === ""
        )
    ) {
        throw new ApiError(400, `All fields are required`);
    }
    if (
        userName.startsWith("OFF") ||
        userName.startsWith("ADM") ||
        userName.startsWith("off") ||
        userName.startsWith("adm")
    ) {
        throw new ApiError("Use a unique username");
    }

    // check if user already exits:email
    const existingUser = await User.findOne({
        $or: [{ email }, { userName }],
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    //if there are images to upload: then check for imge,upload to cloudinary,create user object
    // create entry in db
    const user = await User.create({
        name,
        userName: userName.toLowerCase(),
        email,
        phone,
        password,
        emailVerified: false,
    });
    // console.log("REQ BODY", req.body);

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!userCreated) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }
    //remove password and refresh token from response
    //check for user creation: null to nahi hua h

    //return res
    return res
        .status(201)
        .json(
            new ApiResponse(200, userCreated, "User Registered Successfully","/dashboard")
        );
});


export { registerUser };
