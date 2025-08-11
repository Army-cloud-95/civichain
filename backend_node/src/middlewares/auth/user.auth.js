import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/errorHandler.js";
import { checkModel } from "../../controllers/user.controller.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Access token is required");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const Model = checkModel(decodedToken.userName || decodedToken.email);
        
        const user = await Model.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        req.userRole = user.role;
        next();
});