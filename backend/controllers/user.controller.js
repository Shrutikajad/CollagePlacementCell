import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs"

 export const getStudents= async (req, res) => {
    try {
        const students = await User.find({ role: 'student' });
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

export const getRecruiters= async(req,res)=>{
    try {
        const recruiters = await User.find({ role: 'recruiter' }).populate('profile.company');
        res.status(200).json({ recruiters });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recruiters' });
    }
}



export const deleteStudent= async(req,res) =>{
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
}

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills, branch, passingYear, cgpa } = req.body;
        
//         const file = req.file;
//         let cloudResponse;
//         if (file) {
//             const fileUri = getDataUri(file);
//             cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         }

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }

//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         // Updating general fields
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skillsArray) user.profile.skills = skillsArray;

//         // Updating resume if uploaded
//         if (cloudResponse) {
//             user.profile.resume = cloudResponse.secure_url; // Save the Cloudinary URL
//             user.profile.resumeOriginalName = file.originalname; // Save the original file name
//         }

//         // Special fields for students only
//         if (user.role === "student") {
//             if (branch) user.profile.branch = branch;
//             if (passingYear) user.profile.passingYear = passingYear;
//             if (cgpa) user.profile.cgpa = cgpa;
//         }

//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Something went wrong.",
//             success: false
//         });
//     }
// }


export const handleCSV = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    // Map CSV data into User model format
                    const students = results.map(student => ({
                        fullname: student.fullname,
                        email: student.email,
                        phoneNumber: student.phoneNumber,
                        password: bcrypt.hashSync(student.password, 10), // Hash passwords for security
                        role: 'student',
                        profile: {
                            branch: student.branch,
                            passingyear: student.passingyear,
                            cgpa: student.cgpa
                        }
                    }));

                    await User.insertMany(students);
                    fs.unlinkSync(req.file.path); // Delete file after upload
                    res.json({ message: 'Students uploaded successfully' });
                } catch (error) {
                    console.error('Error processing CSV data:', error);
                    res.status(500).json({ error: 'Failed to process CSV data' });
                }
            })
            .on('error', (error) => {
                console.error('Error reading the CSV file:', error);
                res.status(500).json({ error: 'Error reading the CSV file' });
            });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Bulk upload failed' });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const student = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!student) {
            return res.status(404).json({
                message: 'Student not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Student updated successfully',
            student,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        });
    }
};
