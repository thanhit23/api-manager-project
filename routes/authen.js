import express from "express";

import authController from "../controllers/authController.js";
import validate from "../middlewares/validate.js";
import { authValidation } from "../validations/index.js";

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.registerUser);
router.post('/login', validate(authValidation.login), authController.loginUser);
router.get('/me', authController.me);

export default router;
