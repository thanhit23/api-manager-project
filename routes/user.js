import express from "express";

import userController from "../controllers/userController.js";
import middlewaresAuthor from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { userValidation } from "../validations/index.js";

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/me', userController.getMe);
router.delete('/:id', middlewaresAuthor.verifyAdmin, validate(userValidation.deleteUser), userController.delete);

export default router;
