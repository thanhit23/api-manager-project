import express from "express"
import commentController from "../controllers/commentController.js"

const router = express.Router()

router.get('/', commentController.getListComments)
router.post('/', commentController.create)
router.delete('/:id', commentController.delete)
router.put('/:id', commentController.update)

export default router
