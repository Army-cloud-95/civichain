import { asyncHandler } from "../utils/errorHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Issue } from "../models/issue.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createIssue = asyncHandler(async (req, res) => {
    const {
        title,
        location,
        description,
        progress,
        tags,
        address,
        votes,
    } = req.body;
    const owner = req.user._id;

    if (
        [
            title,
            location,
            description,
            owner,
            progress,
            tags,
            address,
            votes,
        ].some((field) => field?.toString().trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existing = {
        tags: tags,
        // location: {
        //     $near: {
        //         $geometry: { type: "Point", coordinates: coords.coordinates },
        //         $maxDistance: 5000,
        //     },
        // },
    };
    const ExistingIssue = await Issue.findOne(existing);

    if (ExistingIssue) {
        throw new ApiError(409, "Issue already existed.");
    }

    const IssueLocalPath = req.files.issueImg?.[0]?.path;

    if (!IssueLocalPath) {
        throw new ApiError(400, "Issue Image is required");
    }
    const issueimg = await uploadOnCloudinary(IssueLocalPath);

    if (!issueimg || !issueimg.secure_url) {
        throw new ApiError(409, "Cloudinary upload failed");
    }

    const issue = await Issue.create({
        title: title.toLowerCase(),
        location,
        description,
        owner,
        progress,
        tags,
        IssueImg: issueimg.secure_url,
        address,
        votes,
    });

    if (!issue) {
        throw new ApiError(
            500,
            "Something went wrong while creating the issue "
        );
    }
    return res
        .status(201)
        .json(
            new ApiResponse(200, issue, "Issue Registerd Successfully", null)
        );
});

const getAllIssues = asyncHandler(async (req, res) => {
    const allIssues = await Issue.find();
    // const string = JSON.stringify(allIssues)
    return res.status(200).json(allIssues);
});

const getSortedIssues = asyncHandler(async (req, res) => {
    const {
        search = "",
        sortBy = "createdAt",
        order = "desc",
    } = req.query;
    const searchQuery = {
        $and: [
            location ? { location: { $regex: search, $options: "i" } } : {},
            {
                $or: [
                    { tags: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                ],
            },
        ],
    };
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery = { [sortBy]: sortOrder };

    const sortedIssue = await Issue.find(searchQuery).sort(sortQuery);
    res.status(200).json(sortedIssue);
    if (!sortedIssue) {
        throw new ApiError(400, "Something went wrong while sorting");
    }
});

const updateIssue = asyncHandler( async( req,res) => {
    const issueId = req.params.issueId;
    if(!issueId || issueId.trim() === ""){
        throw new ApiError(400,"Issue is not valid");
    }
    const ExistingIssue = await Issue.findByIdAndUpdate(issueId,{})
    if(!ExistingIssue){
        throw new ApiError(400,"");
    }
});
export { createIssue, getAllIssues, getSortedIssues, updateIssue };
