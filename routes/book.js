import express from "express";
import booksController from "../controllers/bookController.js";

const router = express.Router();

router.post('/', booksController.create);
router.get('/', booksController.getList);
router.get('/:id', booksController.detail);
router.get('/search/:keyword', booksController.getListByName);
router.delete('/:id', booksController.delete);
router.put('/:id', booksController.update);

export default router;
