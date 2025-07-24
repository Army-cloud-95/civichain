import { asyncHandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Official } from "../models/official.model.js";
import { Invite } from "../models/invite.model.js";
import { Admin } from "../models/admin.model.js";

const getPendingOfficial = asyncHandler(async (req, res) => {
    if (req.user.role != "Admin") {
        throw new ApiError(403, "Only officials are allowed to view requests");
    }
    const { page = 1, limit = 10 } = req.query;

    const pendingAdmins = await Invite.find({ status: "pending" })
        .select("-password -RefreshToken")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const totalPending = await Invite.countDocuments({ status: "pending" });
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                pendingAdmins,
                totalPending,
                currentPage: page,
                totalPages: Math.ceil(totalPending / limit),
            },
            "Pending official registerations retrieved Successfully"
        )
    );
});
const getAllOfficials = asyncHandler(async (req, res) => {
    
});
const createAdminId = async() => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2,"0");
    const month = (now.getMonth() + 1).toString().padStart(2,"0");
    const year = now.getFullYear().toString().slice(-2);

    const adminId = `ADM${day}${month}${year}`;
    return adminId;
}
const registerAdmin = asyncHandler( async() => {
    const existingAdmin = await Admin.findOne({ role: "Admin"});
    if(existingAdmin){
        console.log("Admin exists");
        return;
    }
    const admin = await Admin.create({
        userName: createAdminId(),
        email:process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        createdBy:"system",

    });
    const adminSaved = Admin.findById(admin._id);
    if(!adminSaved){
        throw new ApiError(500, "Something went wrong while creating admin");
    }
    console.log("Admin created");
})

export { getPendingOfficial, getAllOfficials, registerAdmin };
