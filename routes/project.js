import express from "express";

import validate from "../middlewares/validate.js";
import projectController from "../controllers/projectController.js";
import projectValidation from "../validations/project.validation.js";

const router = express.Router()

router.get('/', validate(projectValidation.getLists), projectController.getListProjects)
router.post('/', validate(projectValidation.create), projectController.create)
router.delete('/:id', validate(projectValidation.deleteEmploy), projectController.delete)
router.put('/:id', validate(projectValidation.update), projectController.update)

export default router
