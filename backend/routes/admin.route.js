import express from "express";
import { createAdmin } from "../controllers/admin.controller.js";

 
const router = express.Router();

router.route("/register").post(createAdmin)

export default router;