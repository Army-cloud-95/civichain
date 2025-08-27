import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        location: {
            type: { type: String, default: "Point", required: true },
            coordinates: { type: [Number], required: true },
        },
        description: {
            type: String,
            required: true,
            default: "",
        },
        IssueImg: {
            type: String, // cloudinary url
            required: true,
        },
        tags: {
            //Sanitaion,similar
            type: [String],
        },
        address: {
            state: {
                type: String,
                required: true, // State should be required
            },
            district: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
                validate: {
                    validator: function (v) {
                        // If provided, should be valid format (flexible for international)
                        return !v || /^[0-9A-Za-z\s-]{3,10}$/.test(v);
                    },
                    message: "Invalid pincode format",
                },
            },
            fullAddress: {
                type: String,
                required: false, // Optional full address
            },
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Official",
            // required:true,
        },
        progress: {
            type: String,
            enum: ["Pending", "In progress", "Completed"],
            required: true,
            default: "Pending",
        },
        votes: {
            type: Number,
            required: true,
            default: 1,
        },
        geoTaggedAddress: {
            city: String,
            district: String,
            state: String,
            pincode: String,
            fullAddress: String,
        },
        priority: {
            type: String,
            required: true,
        },
        // predictionConfidence:{
        //     type:Number,
        //     required:true,
        // },
    },
    { timestamps: true }
);
IssueSchema.index({ location: "2dsphere" });

export const Issue = mongoose.model("Issue", IssueSchema);
