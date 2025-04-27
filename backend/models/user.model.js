import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter','admin'],
        required:true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        branch: { type: String }, // not required globally
        passingyear: { type: Number }, // changed to Number
        cgpa: { type: Number }, // changed to Number
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);