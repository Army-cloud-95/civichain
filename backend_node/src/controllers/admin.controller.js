import { asyncHandler } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
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
const getAllOfficial = asyncHandler(async (req, res) => {
    if (req.user.role !== "Admin") {
        throw new ApiError(
            403,
            "Only admins are allowed to view all officials"
        );
    }

    const { page = 1, limit = 10, status } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Build query filter
    let filter = {};
    if (status) {
        filter.status = status; // pending, approved, rejected
    }

    const officials = await Admin.find(filter)
        .select("-password -refreshToken")
        .limit(limitNumber)
        .skip((pageNumber - 1) * limitNumber)
        .sort({ createdAt: -1 });

    const totalOfficials = await Admin.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                officials,
                totalOfficials,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalOfficials / limitNumber),
            },
            "All officials retrieved successfully"
        )
    );
});

const createAdminId = async () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString().slice(-2);

    const adminId = `ADM${day}${month}${year}`;
    return adminId;
};

export { getPendingOfficial, getAllOfficial,createAdminId };
