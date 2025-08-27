import { ApiError } from "./ApiError.js";
import { asyncHandler } from "./errorHandler.js";
import { ApiResponse } from "./ApiResponse.js";

const ML_SERVICE = process.env.ML_URL;

export const generateTagsAndPriority = async (descriptionData) => {
    const res = await fetch(`${ML_SERVICE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: descriptionData }),
    });
    if (!res.ok) {
        throw new ApiError(res.status, `ML service error: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    if (data.priority && data.tags) {
        return {
            // description: data.description,
            priorityAssigned: data.priority,
            tagAssigned: data.tags,
        };
    } else {
        throw new ApiError(400, "Not found");
    }
};
