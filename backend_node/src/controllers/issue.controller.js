import { asyncHandler } from "../utils/errorHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Issue } from "../models/issue.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const createIssue = asyncHandler(async (req, res) => {
    const { title, coordinates:coordsString, description, progress, tags, address:addressString, votes } =
        req.body;
    const owner = req.user._id;
     let coordinates;
    try {
        coordinates = JSON.parse(coordsString);
    } catch (error) {
        throw new ApiError(400, "Invalid coordinates format");
    }
   if (!Array.isArray(coordinates) || coordinates.length !== 2) {
        throw new ApiError(400, "Coordinates must be an array with exactly 2 elements");
    }
    
    const [longitude, latitude] = coordinates.map(coord => parseFloat(coord));
    // const [longitude, latitude] = coordinates;
    console.log(typeof(addressString))
    let address;
    try{
        address = JSON.parse(addressString);
            console.log("Parsed address:", address);
    console.log("Address type:", typeof address);
    console.log("Address keys:", Object.keys(address));
    }catch(error){
       console.log("Address parsing error:", error.message);
        throw new ApiError(400,"Something went wrong");
    }

    if (
        [
            title,
            coordinates,
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
    const GeoApiResponse = await fetch(
       `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    // console.log(GeoApiResponse);
    // console.log(GeoApiResponse.status);
    if (!GeoApiResponse.ok) {
        throw new ApiError(500, "Something went wrong while locating you");
    }
    const locationData = await GeoApiResponse.json();

    const existing = {
        tags: { $in: tags },
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 5000,
            },
        },
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
        location: {
            type: "Point",
            coordinates: [longitude, latitude],
        },
        description,
        owner,
        progress,
        tags,
        IssueImg: issueimg.secure_url,
        address,
        votes,
        geoTaggedAddress: {
        city: locationData.address?.city || locationData.address?.town || locationData.address?.village || '',
        district: locationData.address?.state_district || locationData.address?.county || '',
        state: locationData.address?.state || '',
        pincode: locationData.address?.postcode || '',
        fullAddress: locationData.display_name || '',
        },
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
    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
        return res
            .status(400)
            .json({ error: "Longitude and latitude are required" });
    }
    try {
        const userLocation = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        if (!userLocation.ok) {
            throw new ApiError(500, "Location invalid");
        }
        const userLocationData = await userLocation.json();
        const userCity = userLocationData.address?.city;
        const userDistrict = userLocationData.address?.state_district;
        if (!userCity && !userDistrict) {
            throw new ApiError(404, "Not found");
        }

        const geoBasedIssues = await Issue.find({
            $or: [
                {
                    "geoTaggedAddress.city": {
                        $regex: userCity,
                        $options: "i",
                    },
                },
                {
                    "geoTaggedAddress.district": {
                        $regex: userDistrict,
                        $options: "i",
                    },
                },
            ],
        });

        // const string = JSON.stringify(allIssues)
        return res.status(200).json(geoBasedIssues);
    } catch (error) {
        const radiusBasedIssues = await Issue.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(longitude),
                            parseFloat(latitude),
                        ],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return res.status(200).json(radiusBasedIssues);
    }
});

const getSortedIssues = asyncHandler(async (req, res) => {
    const { search = "", sortBy = "createdAt", order = "desc" } = req.query;
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

const updateIssueProgress = asyncHandler(async (req, res) => {
    const issueId = req.params.issueId;
    const { progress } = req.body;
    const { regionAssigned } = req.user;
    if (progress !=="In progress" && progress !== "Completed") {
        throw new ApiError("Invalid progress");
    }
    if (!issueId || issueId.trim() === "") {
        throw new ApiError(404, "Issue is not valid");
    }
    const ExistingIssue = await Issue.findById(issueId);
    if (!ExistingIssue) {
        throw new ApiError(400, "Issue does not exist");
    }
    if(ExistingIssue.geoTaggedAddress?.district !== regionAssigned){
        throw new ApiError(403, "Cannot make changes");
    }
    const updatedIssue = await Issue.findByIdAndUpdate(
        issueId,
        {
            progress: progress,
        },
        {
            new: true,
            runValidators: true, // This ensures schema validation runs
        }
    );
    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                updatedIssue,
                "Issue Updated Successfully",
                null
            )
        );
});

const myIssue = asyncHandler(async (req, res) => {
    const owner = req.user._id;
    if (!owner) {
        throw new ApiError(404, "No user found");
    }
    const existingCitizen = await User.findById(owner);
    if (!existingCitizen) {
        throw new ApiError(404, "User not found");
    }
    const existingIssue = await Issue.find({ owner: owner });
    if (!existingIssue) {
        throw new ApiError(404, "Not registered by you ");
    }
    return res.status(201).json(existingIssue);
});

export {
    createIssue,
    getAllIssues,
    getSortedIssues,
    updateIssueProgress,
    myIssue,
};
