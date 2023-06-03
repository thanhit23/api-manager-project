import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post('/', taskController.create);
router.get('/', taskController.getList);
router.get('/:id', taskController.detail);
router.get('/search/:keyword', taskController.getListByName);
router.delete('/:id', taskController.delete);
router.put('/:id', taskController.update);

export default router;
