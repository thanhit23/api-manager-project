import express from "express";

import authController from "../controllers/authController.js";

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/me', authController.me);

export default router;
