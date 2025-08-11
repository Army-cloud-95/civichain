import { asyncHandler } from "../../utils/errorHandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const requireRoles = (...allowedRoles) => {
    return asyncHandler((req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Authentication required");
        }

        const userRole = req.user.role; // Admin, Official, or Citizen
        console.log('User role:', userRole);
        console.log('Allowed roles:', allowedRoles);

        if (!allowedRoles.includes(userRole)) {
            throw new ApiError(
                403,
                `Access denied. Required roles: ${allowedRoles.join(", ")}`
            );
        }

        next();
    });
};

// Convenience middlewares with proper capitalization
export const requireAdmin = requireRoles("Admin");
export const requireOfficial = requireRoles("Official"); 
export const requireCitizen = requireRoles("Citizen");
