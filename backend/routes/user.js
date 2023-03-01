import express from "express";
import {
  register,
  login,
  whoami,
  logout,
  updatePassword,
  updateProfile,
  myProfile,
  getAllUsers,
  forgotPassword,
  resetPassword
  
} from "../controllers/user.js";
import { isAuthenticated } from "../utils/Auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/whoami", whoami);

router.get("/logout", logout);

router.put("/update/password", isAuthenticated, updatePassword);

router.put("/update/profile", isAuthenticated, updateProfile);

router.get("/me", isAuthenticated, myProfile);

router.get("/users", isAuthenticated, getAllUsers);

router.post("/forgot/password", forgotPassword);

router.put("/password/reset/:token", resetPassword);


export default router;
