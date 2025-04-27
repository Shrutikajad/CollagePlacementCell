import express from "express";
import { deleteStudent, getRecruiters, getStudents, handleCSV, login, logout, register, updateProfile, updateStudent } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/getStudentsDetails").get(getStudents);
router.route("/getStudentsDetails/:id").put(updateStudent)
router.route("/recruiters").get(getRecruiters);
router.route("/deleteStudent/:id").delete(deleteStudent);
router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route('/students/bulk-upload').post(handleCSV);
export default router;

