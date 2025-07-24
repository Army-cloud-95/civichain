import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        userName: {
            type: String,
            required: true,
            index: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        emailVerified:{
            type:Boolean,
            required:true,
            default:false,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            min: [8, "Min Password should be 8"],
            max: 12,
        },
        refreshToken: {
            type: String,
        },
        verificationToken:{
            type:String,
        },
        role: {
            type: String,
            default: "Citizen",
        },
        // location:{
        //     type: { type: String, default:"Point"},
        //     coordinates: [Number],
        // },
    },
    { timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    
    next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateVerificationToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
    },
process.env.VERIFICATION_SECRET,{
    expiresIn: "1h"
});
}
UserSchema.methods.verifyVerificationToken = function(token){
    if(!this.verificationToken || this.verificationToken !== token)
        return false;
    if(new Date() > new Date(this.createdAt.getTime() + (60*60*1000)))
        return false;
    return true;
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role:this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role:this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", UserSchema);
