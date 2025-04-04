import { Admin} from "../models/admin.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// export const authMiddleware = async (req, res, next) => {
//     try {
//         console.log("Request Headers:", req.headers); // Debugging
//         console.log("JWT Secret:", process.env.JWT_SECRET); // Debugging

//         let token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).json({ message: 'Unauthorized: No token provided' });
//         }

//         if (token.startsWith('Bearer ')) {
//             token = token.slice(7, token.length);
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await Admin.findById(decoded.id).select('-password');

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized: User not found' });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("JWT Verification Error:", error); // Debugging
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }

// };

export const createAdmin=async(req,res)=>{

    // try {
    //     // Basic validation (you should add more robust validation)
    //     if (!req.body.fullName || !req.body.password || !req.body.email) {
    //       return res.status(400).json({ message: 'Username, password, and email are required.' });
    //     }
    
    //     // Check if the requesting user is a superadmin
    //     if (req.user.role !== 'superadmin') {
    //       return res.status(403).json({ message: 'Unauthorized. Superadmin access required.' });
    //     }
    
    //     // Hash the password
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    //     const admin = new Admin({
    //       fullName: req.body.fullName,
    //       password: hashedPassword,
    //       email: req.body.email,
    //       role: req.body.role || 'admin', // Default to 'admin' if not provided
    //       permissions: req.body.permissions,
    //     });
    
    //     await admin.save();
    //     res.status(201).json({ message: 'Admin created successfully', admin });
    
    //   } catch (error) {
    //     if (error.code === 11000) { // MongoDB duplicate key error
    //       return res.status(400).json({ message: 'Username or email already exists.' });
    //     }
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error', error: error.message });
    //   }

     const { fullname, email, password, role } = req.body;
             
            if (!fullname || !email  || !password || !role) {
                return res.status(400).json({
                    message: "Something is missing",
                    success: false
                });
            };
            const file = req.file;
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    
            const user = await Admin.findOne({ email });
            if (user) {
                return res.status(400).json({
                    message: 'User already exist with this email.',
                    success: false,
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
    
            await Admin.create({
                fullname,
                email,
                password: hashedPassword,
                role,
            });
    
            return res.status(201).json({
                message: "Account created successfully.",
                success: true
            });
        
}