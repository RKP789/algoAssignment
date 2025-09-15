import express from "express";
import { login, signup } from "../controllers/userControllers.js";
import verifyToken from "../middlewares/userAuth.js";
import { logout } from "../controllers/userControllers.js";
import { updateUser } from "../controllers/userControllers.js";
import { deleteUser } from "../controllers/userControllers.js";
import { getUser } from "../controllers/userControllers.js";

const router = express.Router();

// auth route
router.route("/login").post(login);
router.route("/sign-up").post(signup);
router.route("/logout").get(verifyToken, logout);

// CURD user route
router.route("/getUser").get(verifyToken, getUser);
router.route("/updateUser").put(verifyToken, updateUser);
router.route("/deleteUser").delete(verifyToken, deleteUser);

export default router;