import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
      },
      password: { 
        type: String, 
        required: true, 
        minlength: 8 
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
      },
      role:{
        type:String,
        enum:['student','recruiter','admin'],
        required:true
    },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      lastLogin: {
        type: Date,
      },
      isActive: {
        type: Boolean,
        default: true
      },
      permissions: { //Example of specific permissions.
        type: [String],
        default: [] //e.g. ['create_users', 'delete_posts', 'view_reports']
      }
},
{timestamps:true});
export const Admin = mongoose.model('Admin', adminSchema);