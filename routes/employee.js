import express from "express";

import validate from "../middlewares/validate.js";
import { employeeValidation } from "../validations/index.js";
import employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get('/', validate(employeeValidation.getLists), employeeController.getList);
router.get('/:id', validate(employeeValidation.getDetail), employeeController.detail);
router.post('/', validate(employeeValidation.create), employeeController.create);
router.delete('/:id', validate(employeeValidation.deleteEmploy), employeeController.delete);
router.put('/:id', validate(employeeValidation.update), employeeController.update);

export default router;
