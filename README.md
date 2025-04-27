🎓 College Placement Management System
A full-stack backend project to manage college placements for students, recruiters, and admins.
Built using Node.js, Express.js, MongoDB, and Mongoose.

✨ Features
Student Registration & Login

Recruiter Registration & Company Profile

Admin Management

Upload & Manage Student Resumes

Apply for Jobs

Track Applications Status (Applied, Shortlisted, Rejected, Offered)

Offer Management (Accept/Reject)

JWT Authentication & Role-based Access Control

Cloudinary Integration for file uploads (resume, profile photo)

API-based Architecture (future frontend ready 🚀)

🛠️ Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

Authentication: JWT, bcrypt.js

File Uploads: Cloudinary + multer

Validation: Custom and mongoose-based

Deployment Ready: (Docker / Render / Railway optional)

📂 Project Structure
/models
  ├── User.js
  ├── Company.js
  ├── Application.js
  └── Offer.js

/controllers
  ├── authController.js
  ├── studentController.js
  ├── recruiterController.js
  └── adminController.js

/middlewares
  ├── authMiddleware.js
  └── uploadMiddleware.js

/routes
  ├── authRoutes.js
  ├── studentRoutes.js
  ├── recruiterRoutes.js
  └── adminRoutes.js

/utils
  └── getDataUri.js

server.js
.env
README.md

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/yourusername/college-placement-system.git
cd college-placement-system

2. Install dependencies
npm install

3. Setup .env file
Create a .env file in the root and add:
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4. Run the Server
   npm run dev
   Server runs at: http://localhost:8000
