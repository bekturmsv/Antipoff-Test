import express from "express";
import { getAllUsers, getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/:id", getUserDetails);
router.get("/users", getAllUsers);

export default router;
